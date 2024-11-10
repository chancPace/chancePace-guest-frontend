import { ReservationStickyStyled } from './styled';
import DateTimePicker from '../DateTimePicker';
import { useRouter } from 'next/router';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button, Input, message } from 'antd';
import { FaDiceSix } from 'react-icons/fa';

interface PaymentStickyProps {
  price: number;
  businessEndTime: number;
  businessStartTime: number;
  spaceId: number;
  cleanTime: number;
  discount: number;
  maxGuests: number;
  minGuests: number;
  addPrice: number;
}
const ReservationSticky = ({
  price,
  businessEndTime,
  businessStartTime,
  spaceId,
  cleanTime,
  discount,
  maxGuests,
  minGuests,
  addPrice,
}: PaymentStickyProps) => {
  const router = useRouter();
  //총 이용시간
  const [totalTime, setTotalTime] = useState<number>(0); // 초기값 0으로 설정
  //총 이용금액
  const [totalPrice, setTotalPrice] = useState<number>(0); // 초기값 0으로 설정
  //할인금액
  // const [discountPrice, setDiscountPrice] = useState<number>(0);
  //예약일
  const [startDate, setStartDate] = useState<string | null>(null);
  //시작 시간
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(
    null
  );
  //종료 시간
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  //기준인원
  const [peopleCount, setPeopleCount] = useState<number>(1); // 기본 인원은 1로 설정
  //할인 적용 금액
  const discountPrice = price - discount;
  // console.log(useTime, '유즈타임');

  //기준인원 +시키기 (최대인원 한도까지)
  const handleIncrement = () => {
    if (peopleCount < maxGuests) {
      setPeopleCount(peopleCount + 1);
    }
  };

  //기준인원 -시키기 (최소 1명)
  const handleDecrement = () => {
    if (peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
    }
  };

  const handleTimeSelect = (
    totalTime: number,
    startTime: number,
    endTime: number
  ) => {
    setTotalTime(totalTime);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    if (!startDate) {
      const calculatedTotal = discountPrice * totalTime;
      // const calculatedDiscount = discount * totalTime;
      setTotalPrice(calculatedTotal);
      // setDiscountPrice(calculatedTotal - calculatedDiscount);
    }
  };

  //시작시간과 종료시간이 설정된경우
  useEffect(() => {
    if (selectedStartTime !== null && selectedEndTime !== null) {
      const calculatedTotal = discountPrice * totalTime;
      const calculatedDiscount = discount * totalTime;
      setTotalPrice(calculatedTotal);
    } else {
      setTotalPrice(0);
    }
  }, [totalTime, price, discount, selectedStartTime, selectedEndTime]);

  const handleDateChange = (newDate: Date | null) => {
    setStartDate(newDate ? format(newDate, 'yyyy-MM-dd') : null);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    setTotalTime(0);
    setTotalPrice(0);
  };

  const generateOrderId = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(
      today.getMonth() + 1
    ).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    return `ORDER-${formattedDate}-${nanoid()}`;
  };

  const handlePayment = () => {
    const token = Cookies.get('token');
    const orderId = generateOrderId();

    if (!token) {
      router.push('/login');
      return;
    }

    if (
      userInfo &&
      (!/^[^\d]+$/.test(userInfo.userName) || !userInfo.phoneNumber)
    ) {
      message.warning('이름과 전화번호를 입력해 주세요.');
      router.push('/mypage'); // 회원정보수정 페이지로 이동
      return;
    }

    router.push({
      pathname: '/pay',
      query: {
        orderId,
        price: discountPrice,
        startDate,
        startTime: Number(selectedStartTime),
        endTime: Number(selectedEndTime) + 1,
        spaceId,
      },
    });
  };

  return (
    <ReservationStickyStyled>
      <p className="space-price">
        <span>{discountPrice.toLocaleString()}원</span> / 시간
      </p>
      <DateTimePicker
        businessStartTime={businessStartTime}
        businessEndTime={businessEndTime}
        price={discountPrice}
        onTimeSelect={handleTimeSelect}
        spaceId={spaceId}
        cleanTime={cleanTime}
        onDateSelect={handleDateChange}
      />
      <div className="people-number">
        <Button
          onClick={handleDecrement}
          disabled={peopleCount <= 1}
          className="minus"
        >
          -
        </Button>
        <Input
          value={peopleCount}
          style={{ width: '50px', textAlign: 'center' }}
          readOnly
        />
        <Button
          onClick={handleIncrement}
          disabled={peopleCount >= maxGuests}
          className="plus"
        >
          +
        </Button>
      </div>
      <div className="people-number-info">
        {peopleCount > minGuests && (
          <p>
            추가 인원은 ({peopleCount - minGuests}명) 시간당{' '}
            {addPrice.toLocaleString()}원 추가요금이 발생합니다. <br /> 추가 비용은 현장
            결제 및 이용시 계좌이체로 진행됩니다
          </p>
        )}
      </div>
      <button
        className="pay-button"
        onClick={handlePayment}
        disabled={
          !startDate || selectedStartTime === null || selectedEndTime === null
        }
      >
        {totalPrice > 0
          ? `${totalPrice.toLocaleString()}원 결제하기`
          : '0원 결제하기'}
      </button>
    </ReservationStickyStyled>
  );
};
export default ReservationSticky;
