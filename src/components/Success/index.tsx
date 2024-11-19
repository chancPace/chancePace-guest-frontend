import { useEffect, useState } from 'react';
import { SuccessStyled } from './styled';
import { useRouter } from 'next/router';
import { verifyPayment } from '@/pages/api/paymentApi';
import { addBooking } from '@/pages/api/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { UserCouponIsUsed } from '@/pages/api/couponApi';
import { message } from 'antd';
import { Space } from '@/types';
import { getOneSpace } from '@/pages/api/spaceApi';
import Link from 'next/link';
const Success = () => {
  const router = useRouter();
  const {
    paymentKey,
    orderId,
    amount,
    startDate,
    startTime,
    endTime,
    spaceId,
    couponId,
    discountAmount,
  } = router.query;
  const userId = useSelector((state: RootState) => state.user.userInfo?.id);
  const [spaceData, setSpaceData] = useState<Space | null>(null); // 공간 데이터를 저장할 상태

  useEffect(() => {
    const handleBooking = async () => {
      if (paymentKey && orderId && amount && userId) {
        try {
          const paymentResult = await verifyPayment({
            paymentKey: String(paymentKey),
            orderId: String(orderId),
            amount: Number(amount),
            couponPrice: Number(discountAmount),
          });
          if (paymentResult.result) {
            const paymentId = paymentResult.data.id;

            const bookingData = {
              startDate: String(startDate),
              startTime: Number(startTime),
              endTime: Number(endTime),
              userId: Number(userId),
              spaceId: Number(spaceId),
              paymentId,
            };
            await addBooking(bookingData);
            const numerCouponId = Number(couponId);
            if (!isNaN(numerCouponId)) {
              try {
                await UserCouponIsUsed(Number(couponId));
                message.success('쿠폰이 성공적으로 사용되었습니다.');
              } catch (error) {
                message.error('쿠폰 사용 업데이트 실패');
              }
            }
          }
        } catch (error) {
          console.error('예약 처리 실패', error);
        }
      }
    };
    handleBooking();
  }, [
    paymentKey,
    orderId,
    amount,
    userId,
    startDate,
    startTime,
    endTime,
    spaceId,
    couponId,
  ]);

  //공간 데이터 가져오기
  useEffect(() => {
    const fetchSpaceData = async () => {
      if (spaceId) {
        try {
          const data = await getOneSpace(Number(spaceId));
          setSpaceData(data.data);
        } catch (error) {
          console.error('공간 데이터 로드 중 오류 발생:', error);
        }
      }
    };
    fetchSpaceData();
  }, [spaceId]);

  return (
    <SuccessStyled>
      <div className="success">
        <div>예약이 완료되었습니다</div>
        <div className="booking-info">
          <div className="img">
            <img src={spaceData?.images[0]?.imageUrl} />
          </div>
          <div className="text">
            <p>
              <span>상호명</span>
              {spaceData?.spaceName}
            </p>
            <p>
              <span>주소</span>
              {spaceData?.spaceLocation}
            </p>
            <p>
              <span>이용일</span>
              {startDate}
            </p>
            <p>
              <span>이용시간</span>
              {startTime}:00 - {endTime}:00
            </p>
          </div>
        </div>
        <Link href="/" passHref>
          <button className="home-btn">메인으로</button>
        </Link>
      </div>
    </SuccessStyled>
  );
};
export default Success;
