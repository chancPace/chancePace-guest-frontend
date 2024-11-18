import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
//loadPaymentWidget: 클라이언트 키와 고유 고객 키를 사용해서 결제 위젯 인스턴스 생성
//PaymentWidgetInstance: loadPaymentWidget 함수가 반환하는 인스턴스 타입 이 인스턴스를 통해 결제 요청이나 결제 수단 위젯 렌더링함
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/router';
import { message, Modal, Select } from 'antd';
import { getUserAllCoupon } from '@/pages/api/couponApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Space, UserCoupon } from '@/types';
import { PaymentStyled } from './styled';
import { getOneSpace } from '@/pages/api/spaceApi';

const Payment = () => {
  //환경 변수에서 클라이언트 키 가져오기
  const clientKey: string = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
  //결제 시 식별할 수 있는 고유 고객 키 (고정 값)
  const customerKey = 'YbX2HuSlsC9uVJW6NMRMjsdgaawegwasergfwrfasdfsq';

  const router = useRouter();
  const { startDate, startTime, endTime, spaceId } = router.query;
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  //유저 쿠폰 상태
  const [coupons, setCoupons] = useState<UserCoupon[]>([]); // 쿠폰 데이터를 저장할 상태 추가
  //유저가 선택한 쿠폰
  const [selectedCoupon, setSelectedCoupon] = useState<UserCoupon | null>(null); // 선택한 쿠폰
  //결제하려는 금액 (상세페이지에서 넘어온 금액)
  const [price, setPrice] = useState<number>(0); // 초기값 0으로 설정
  //쿠폰할인 반영된 최종 금액
  const [finalPrice, setFinalPrice] = useState<number>(0); // 최종 결제 금액 초기값도 0으로 설정
  //쿠폰 할인금액
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  //결제하는 공간의 데이터
  const [spaceDetails, setSpaceDetails] = useState<Space | null>(null);
  //모달창
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 위젯 로딩 상태
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  const paymentContainerRef = useRef<HTMLDivElement>(null);
  //결제 위젯의 인스턴스를 참조하기 위한 변수
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  //결제 방식 위젯(신용카드, 계좌이체) 등의 인스턴스를 참조하기 위한 변수

  // URL 인코딩된 키라면, 디코딩 후 삭제
  localStorage.removeItem(
    decodeURIComponent('@payment-widget/previous-payment-method-id')
  );

  useEffect(() => {
    if (router.query.price) {
      const parsedPrice = Number(router.query.price);
      setPrice(parsedPrice);
      setFinalPrice(parsedPrice);
    }
  }, []);

  //유저가 예약하려는 공간불러오기
  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await getOneSpace(Number(spaceId));
        setSpaceDetails(response.data);
      } catch (error) {
        console.error('공간 불러오기 실패', error);
      }
    };
    fetchSpaceData();
  }, [spaceId]);

  const handlePayment = async () => {
    if (!isWidgetLoaded) {
      console.error('결제 위젯이 아직 로드되지 않았습니다');
      return;
    }

    try {
      const paymentWidget = paymentWidgetRef.current;

      if (!paymentWidget) {
        console.error('결제 위젯이 초기화되지 않았습니다');
        return;
      }

      await paymentWidget.requestPayment({
        orderId: `ORDER-${nanoid()}`,
        orderName: 'test',
        successUrl: `${window.location.origin}/success?startDate=${startDate}&startTime=${startTime}&endTime=${endTime}&userId=${userInfo?.id}&spaceId=${spaceId}&couponId=${selectedCoupon?.id}&discountAmount=${discountAmount}`, // 필요한 예약 데이터 추가
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error('결제확인실패', error);
    }
  };

  //유저 쿠폰 조회
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const coupon = await getUserAllCoupon(Number(userInfo?.id));
        const unusedCoupons = coupon.data.filter((c: UserCoupon) => !c.isUsed);
        setCoupons(unusedCoupons);
      } catch (error) {
        message.error('쿠폰 불러오기 실패');
      }
    };
    fetchCoupon();
  }, [userInfo?.id]);

  //쿠폰 선택시 금액 반영
  const handleCouponSelect = (couponId: number) => {
    const selected = coupons.find((coupon) => coupon.id === couponId) || null;
    setSelectedCoupon(selected);

    if (selected) {
      const discount = selected.coupon.discountPrice;
      setDiscountAmount(discount); // 할인 금액 설정
      setFinalPrice(price - discount); // 직접 할인 금액 적용
    } else {
      setDiscountAmount(0); // 할인 금액 초기화
      setFinalPrice(price); // 원래 가격으로 설정
    }
  };

  //결제 위젯 초기화

  //toss payments 결제 위젯을 로드하여 초기화
  const initializePaymentWidget = async () => {
    //환경 변수에서 클라이언트 키를 가져오지 못한 경우
    if (!clientKey) {
      console.error('클라이언트 키가 설정되지 않았습니다');
      return;
    }
    try {
      //Toss Payments SDK의 loadPaymentWidget 함수를 통해 결제 위젯 인스턴스 생성
      //클라이언트 키와 고객 키 사용
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      //결제 방식 위젯 렌더링 (신용카드, 계좌이체 등 결제수단 목록을 보여줌))
      //#payment-widget요소안에 렌더링  결제급액은 price상태 값
      paymentWidget.renderPaymentMethods(
        '#payment-widget', //위젯이 렌더링될 dom요소
        { value: finalPrice }, // 최종 결제 금액 사용
        { variantKey: 'DEFAULT' } //기본 테마 설정
      );
      //결제 위젯과 결제 방식 위젯의 인스턴스를 각각 참조 변수에 저장
      paymentWidgetRef.current = paymentWidget;
      setIsWidgetLoaded(true);
    } catch (error) {
      console.error('결제 위젯 로딩 중 오류가 발생함', error);
    }
  };
  //함수를 호출하여 결제 위젯 초기화

  useEffect(() => {
    if (clientKey) {
      initializePaymentWidget();
    }
  }, [clientKey, finalPrice]);

  //환불 규정 모달
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <PaymentStyled>
      <div className="payment-left">
        <div className="reservation-info">
          <div className="reservation-title">예약자 정보</div>
          <div className="reservation-text">
            <p>
              <span>예약자</span> {userInfo?.userName}
            </p>
            <p>
              <span>이메일</span> {userInfo?.email}
            </p>
            <p>
              <span>연락처</span> {userInfo?.phoneNumber}
            </p>
          </div>
        </div>
        <div className="refund-information">
          <div className="reservation-title">환불 규정 안내</div>
          <p>
            예약 날짜인 {startDate} 전에 취소 시 부분 환불을 받으실 수 있습니다.
            그 이후에는 취소 시점에 따라 환불액이 결정됩니다. <br />
            <span onClick={showModal} className="modal-button">
              자세히 알아보기
            </span>
          </p>
        </div>
        <div>
          <div className="reservation-title">쿠폰</div>
          <Select
            placeholder="쿠폰을 선택하세요"
            onChange={handleCouponSelect}
            value={selectedCoupon ? selectedCoupon.id : undefined}
          >
            <Select.Option value={-1}>선택안함</Select.Option>

            {coupons?.map((x) => {
              const isDisabled = price < x.coupon.discountPrice;
              return (
                <Select.Option key={x.id} value={x.id} disabled={isDisabled}>
                  {x.coupon.couponName} |
                  {x.coupon.discountPrice.toLocaleString()}원
                </Select.Option>
              );
            })}
          </Select>
        </div>

        <div className="App">
          <div id="payment-widget" ref={paymentContainerRef}></div>
        </div>
      </div>
      <div className="payment-right">
        {spaceDetails && (
          <div className="reservation-space">
            <div className="img">
              <img src={spaceDetails.images[0].imageUrl}></img>
            </div>
            <div className="reservation-space-text">
              <p>
                <span>상호명</span>
                {spaceDetails.spaceName}
              </p>

              <p>
                <span>위치</span>
                {spaceDetails.spaceLocation}
              </p>
              <p>
                <span>연락처</span>
                {spaceDetails.spaceAdminPhoneNumber}
              </p>
              <p>
                <span>예약일</span> {startDate}
              </p>
              <p>
                <span>예약시간</span> {startTime}:00 - {endTime}:00
              </p>
            </div>
          </div>
        )}

        <div className="reservation-agreement">
          <div className="agreement-title">결제 동의</div>
          <div className="reservation-pay">
            <p>
              <span>상품 가격</span>
              {price.toLocaleString()}
            </p>
            {discountAmount > 0 && (
              <p>
                <span>쿠폰 할인</span> -{discountAmount.toLocaleString()}원
              </p>
            )}

            <p>
              <span>총 결제 금액</span>
              {finalPrice.toLocaleString()}
            </p>
          </div>
        </div>
        <button onClick={handlePayment} className="pay-button">
          {finalPrice.toLocaleString()}원 결제하기
        </button>
      </div>

      <Modal
        title="환불 정책"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <div>
          <p>예약일 기준 3일전: 100% 환불</p>
          <p>예약일 기준 2일전: 90% 환불</p>
          <p>예약일 기준 1일전: 80% 환불</p>
          <p>예약일 기준 당일 및 NO-SHOW: 환불불가</p>
        </div>
      </Modal>
    </PaymentStyled>
  );
};
export default Payment;
