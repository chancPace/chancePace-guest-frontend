//환경 변수에서 클라이언트 키 가져오기
const clientKey: string = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
//결제 시 식별할 수 있는 고유 고객 키 (고정 값)
const customerKey = 'YbX2HuSlsC9uVJW6NMRMjsdgaawegwasergfwrfasdfsq';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/router';

const Payment = () => {
  const router = useRouter();
  const { price, startDate, startTime, endTime, userId, spaceId } =
    router.query;

  //결제 위젯의 인스턴스를 참조하기 위한 변수
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  //결제 방식 위젯(신용카드, 계좌이체) 등의 인스턴스를 참조하기 위한 변수
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

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
          { value: Number(price) }, // 결제금액 설정
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
  }, [clientKey, price]);

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
        successUrl: `${window.location.origin}/success?startDate=${startDate}&startTime=${startTime}&endTime=${endTime}&userId=${userId}&spaceId=${spaceId}`, // 필요한 예약 데이터 추가
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error('결제확인실패', error);
    }
  };

  return (
    <div className="App">
      <h1>주문서</h1>
      <div id="payment-widget"></div>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};
export default Payment;
