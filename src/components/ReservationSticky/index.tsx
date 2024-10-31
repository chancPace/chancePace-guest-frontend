import { ReservationStickyStyled } from './styled';
import DateTimePicker from '../DateTimePicker';
import { useRouter } from 'next/router';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface PaymentStickyProps {
  price: number;
  businessEndTime: number;
  businessStartTime: number;
  spaceId: number;
}
const ReservationSticky = ({
  price,
  businessEndTime,
  businessStartTime,
  spaceId,
}: PaymentStickyProps) => {
  const router = useRouter();
  const [totalTime, setTotalTime] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(
    null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);

  useEffect(() => {
    //total타임이 변경될때마다 totalPirce업데이트
    setTotalPrice(price * totalTime);
  }, [totalTime, price]);

  const handleTimeSelect = (
    totalTime: number,
    startTime: number,
    endTime: number,
    date: string,
  ) => {
    setTotalTime(totalTime);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setStartDate(date);

  };

  const generateOrderId = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(
      today.getMonth() + 1
    ).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    return `ORDER-${formattedDate}-${nanoid()}`;
  };

  const handlePayment = () => {
    const orderId = generateOrderId();

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
      />
      <div className="additional-people">
        <p>인원추가</p>
        <div className="form">
          <PlusCircleOutlined />
          <div className="additional"></div>
          <MinusCircleOutlined />
        </div>
      </div>
      <button
        className="pay-button"
        onClick={handlePayment}
      >{`${totalPrice.toLocaleString()}원 결제하기`}</button>
    </ReservationStickyStyled>
  );
};
export default ReservationSticky;
