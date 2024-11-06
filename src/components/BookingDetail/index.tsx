import { MyBookingData } from '@/types';
import { BookingDetailStyled } from './styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getOneBooking } from '@/pages/api/bookingApi';
import { message } from 'antd';

interface BookingDetailProps {
  bookingId: number;
}

const BookingDetail = ({ bookingId }: BookingDetailProps) => {
  const [bookingDetails, setBookingDetails] = useState<MyBookingData | null>(
    null
  );

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const data = await getOneBooking(bookingId);
        console.log(data, '데이터');
        setBookingDetails(data.data);
      } catch (error) {
        message.error('예약 상세 정보를 불러오는 데 실패했습니다.');
        console.error('데이터 불러오기 실패', error);
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  return (
    <BookingDetailStyled>
      {bookingDetails && (
        <div>
          <h1>예약 상세 정보</h1>
          <div className="img">
          {/* <img src={`http://localhost:4000/${bookingDetails.Space?.Images[0].imageUrl}`} /> */}

          </div>
          <div className="text">
            <p>예약 공간: {bookingDetails.space?.spaceName}</p>
            <p>예약 위치: {bookingDetails.space?.spaceLocation}</p>
            <p>예약 날짜: {bookingDetails.startDate}</p>
            <p>
              이용 시간: {bookingDetails.startTime}:00 -{' '}
              {bookingDetails.endTime}
              :00
            </p>
            <p>결제 방식: {bookingDetails.payment?.paymentMethod}</p>
            <p>결제 방식: {bookingDetails.payment?.cardNumber}</p>
            <p>
              결제 금액:{' '}
              {bookingDetails.payment?.paymentPrice?.toLocaleString()}원
            </p>
            <p>
              쿠폰 할인:{' '}
              {bookingDetails.payment?.couponPrice
                ? `${bookingDetails.payment.couponPrice}원`
                : '-'}
            </p>
          </div>
        </div>
      )}

      {/* 기타 예약 정보 표시 */}
    </BookingDetailStyled>
  );
};
export default BookingDetail;
