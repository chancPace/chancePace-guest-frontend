//환경 변수에서 클라이언트 키 가져오기
const clientKey: string = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
//결제 시 식별할 수 있는 고유 고객 키 (고정 값)
const customerKey = 'YbX2HuSlsC9uVJW6NMRMjsdgaawegwasergfwrfasdfsq';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/router';
import { message, Select } from 'antd';
import { getUserAllCoupon, UserCouponIsUsed } from '@/pages/api/couponApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Space, UserCoupon } from '@/types';
import { PaymentStyled } from './styled';
import { getOneSpace } from '@/pages/api/spaceApi';

const Payment = () => {
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

  //결제하는 공간의 데이터
  const [spaceDetails, setSpaceDetails] = useState<Space | null>(null);
  console.log(selectedCoupon, '셀렉트쿠폰');
  //결제 위젯의 인스턴스를 참조하기 위한 변수
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  //결제 방식 위젯(신용카드, 계좌이체) 등의 인스턴스를 참조하기 위한 변수
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  useEffect(() => {
    if (router.query.price) {
      const parsedPrice = Number(router.query.price);
      setPrice(parsedPrice || 0);
      setFinalPrice(parsedPrice || 0); // 가격이 업데이트될 때 finalPrice를 설정
    }
  }, [router.query.price]);

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
    try {
      const paymentWidget = paymentWidgetRef.current;
      if (!paymentWidget) {
        console.error('결제 위젯이 초기화되지 않았습니다');
        return;
      }

      await paymentWidget.requestPayment({
        orderId: `ORDER-${nanoid()}`,
        orderName: 'test',
        successUrl: `${window.location.origin}/success?startDate=${startDate}&startTime=${startTime}&endTime=${endTime}&userId=${userInfo?.id}&spaceId=${spaceId}&couponId=${selectedCoupon?.id}`, // 필요한 예약 데이터 추가
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
        const unusedCoupons = coupon.data.filter((c:UserCoupon) => !c.isUsed);
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
      const discountAmount = selected.Coupon.discountPrice;
      setFinalPrice(price - discountAmount); // 할인 반영하여 결제 금액 설정)
    } else {
      setFinalPrice(price); // 쿠폰 선택 해제 시 원래 금액으로 복원
    }
  };

  useEffect(() => {
    //결제 위젯 초기화
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
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          '#payment-widget', //위젯이 렌더링될 dom요소
          { value: finalPrice }, // 최종 결제 금액 사용
          { variantKey: 'DEFAULT' } //기본 테마 설정
        );
        //결제 위젯과 결제 방식 위젯의 인스턴스를 각각 참조 변수에 저장
        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
      } catch (error) {
        console.error('결제 위젯 로딩 중 오류가 발생함', error);
      }
    };
    //함수를 호출하여 결제 위젯 초기화
    initializePaymentWidget();
  }, [clientKey, finalPrice]);

  return (
    <PaymentStyled>
      <div className="reservation-space">
        <div className="reservation-title">예약 공간</div>
        {spaceDetails && (
          <div className="reservation-space-info">
            <div className="img">
              <img
                src={`http://localhost:4000/${spaceDetails.Images[0].imageUrl}`}
              ></img>
            </div>
            <div className="reservation-text">
              <p>{spaceDetails.spaceName}</p>
              <p>{spaceDetails.spaceLocation}</p>
              <p>{spaceDetails.spaceAdminPhoneNumber}</p>
            </div>
          </div>
        )}
      </div>
      <div className="reservation-info">
        <div className="reservation-title">예약 정보</div>
        <div className="reservation-text">
          <p>예약일: {startDate}</p>
          <p>
            예약시간: {startTime}:00 - {endTime}:00
          </p>
        </div>
      </div>
      <div className="reservation-user-info">
        <div className="reservation-title">예약자 정보</div>
        <div className="reservation-text">
          <p>예약자: {userInfo?.name}</p>
          <p>이메일: {userInfo?.email}</p>
          <p>연락처: {userInfo?.phoneNumber}</p>
        </div>
      </div>
      <div className="refund-information">
        <div className="reservation-title">환불 규정 안내</div>
        <p>
          체크인 날짜인 11월 8일 전에 취소하면 부분 환불을 받으실 수 있습니다.
          그 이후에는 취소 시점에 따라 환불액이 결정됩니다.{' '}
          <span>자세히 알아보기</span>
        </p>
      </div>
      <div></div>
      <div className="reservation-pay">
        <p>결제금액:{price.toLocaleString()}</p>
        <p>쿠폰선택</p>
        <Select placeholder="쿠폰을 선택하세요" onChange={handleCouponSelect}>
          {coupons?.map((x) => {
            return (
              <Select.Option key={x.id} value={x.id}>
                {x.Coupon.couponName}
                {x.Coupon.discountPrice.toLocaleString()}원
              </Select.Option>
            );
          })}
        </Select>
        <p>최종 결제 금액: {finalPrice.toLocaleString()}</p>
      </div>
      <div className="reservation-agreement">
        <div className="reservation-title">주문 내용 확인 및 결제 동의</div>
      </div>
      <div className="App">
        <div id="payment-widget"></div>
        <button onClick={handlePayment}>결제하기</button>
      </div>
    </PaymentStyled>
  );
};
export default Payment;
