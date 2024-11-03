import { ReservationStickyStyled } from './styled';
import DateTimePicker from '../DateTimePicker';
import { useRouter } from 'next/router';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { format } from 'date-fns';

interface PaymentStickyProps {
  price: number;
  businessEndTime: number;
  businessStartTime: number;
  spaceId: number;
  cleanTime: number;
  discount: number;
}
const ReservationSticky = ({
  price,
  businessEndTime,
  businessStartTime,
  spaceId,
  cleanTime,
  discount,
}: PaymentStickyProps) => {
  const router = useRouter();
  const [totalTime, setTotalTime] = useState<number>(0); // 초기값 0으로 설정
  const [totalPrice, setTotalPrice] = useState<number>(0); // 초기값 0으로 설정
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(
    null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (selectedStartTime !== null && selectedEndTime !== null) {
      const calculatedTotal = price * totalTime;
      const calculatedDiscount = discount * totalTime;
      setTotalPrice(calculatedTotal);
      setDiscountPrice(calculatedTotal - calculatedDiscount);
    } else {
      // 초기화 상태
      setTotalPrice(0);
      setDiscountPrice(0);
    }
  }, [totalTime, price, discount, selectedStartTime, selectedEndTime]);

  const handleTimeSelect = (
    totalTime: number,
    startTime: number,
    endTime: number
  ) => {
    setTotalTime(totalTime);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    // setStartDate(date);
    if (!startDate) {
      const calculatedTotal = price * totalTime;
      const calculatedDiscount = discount * totalTime;
      setTotalPrice(calculatedTotal);
      setDiscountPrice(calculatedTotal - calculatedDiscount);
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    setStartDate(newDate ? format(newDate, 'yyyy-MM-dd') : null);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    setTotalTime(0); // 초기 totalTime 설정

    setTotalPrice(0);
    setDiscountPrice(0);
  };

  const generateOrderId = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(
      today.getMonth() + 1
    ).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    return `ORDER-${formattedDate}-${nanoid()}`;
  };

  const handlePayment = () => {
    const token = Cookies.get('token'); // 쿠키에 저장된 토큰 확인
    const orderId = generateOrderId();

    if (!token) {
      // 토큰이 없으면 로그인 페이지로 이동
      router.push('/login');
      return;
    }

    router.push({
      pathname: '/pay',
      query: {
        orderId,
        price: totalPrice,
        startDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        spaceId,
      },
    });
  };

  return (
    <ReservationStickyStyled>
      <p>
        <span>{price.toLocaleString()}원</span> / 시간
      </p>
      <DateTimePicker
        businessStartTime={businessStartTime}
        businessEndTime={businessEndTime}
        price={price}
        onTimeSelect={handleTimeSelect}
        spaceId={spaceId}
        cleanTime={cleanTime}
        onDateSelect={handleDateChange} // 날짜 변경 핸들러 추가
      />
      <div className="additional-people">
        <p>인원추가</p>
        <div className="form">
          <PlusCircleOutlined />
          <div className="additional"></div>
          <MinusCircleOutlined />
        </div>
      </div>
      <div className="price-summary">
        <p>이용 금액: {totalPrice.toLocaleString()}원</p>
        <p className="discount">
          할인 금액: -
          {totalPrice > 0 ? (discount * totalTime).toLocaleString() : '0'}원
        </p>
        <p className="final-price">
          총 결제 금액: {discountPrice.toLocaleString()}원
        </p>
      </div>
      <button
        className="pay-button"
        onClick={handlePayment}
        disabled={
          !startDate || selectedStartTime === null || selectedEndTime === null
        }
      >
        {discountPrice > 0
          ? `${discountPrice.toLocaleString()}원 결제하기`
          : '0원 결제하기'}
      </button>
    </ReservationStickyStyled>
  );
};
export default ReservationSticky;
