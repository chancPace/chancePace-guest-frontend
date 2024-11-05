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
            couponPrice:Number(discountAmount)
          });
          if (paymentResult.result) {
            // console.log(paymentResult.data.id,'페이먼트리절트')
            const paymentId = paymentResult.data.id;
            // console.log(paymentId, '페이먼트아이디');

            const bookingData = {
              startDate: Array.isArray(startDate)
                ? startDate[0]
                : startDate || '', // string으로 변환
              startTime: Array.isArray(startTime)
                ? parseInt(startTime[0])
                : parseInt(startTime || '0'),
              endTime: Array.isArray(endTime)
                ? parseInt(endTime[0])
                : parseInt(endTime || '0'),
              userId,
              spaceId: Array.isArray(spaceId)
                ? parseInt(spaceId[0])
                : parseInt(spaceId || '0'),
              paymentId,
            };
            await addBooking(bookingData);
            const numericCouponId = Number(couponId);
            if (!isNaN(numericCouponId)) {
              // couponId가 유효한 숫자일 때만 실행
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
          const data = await getOneSpace(Number(spaceId)); // spaceId로 공간 데이터 가져오기
          console.log(data, '데이터터터터');
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
      <div className="booking-info">
        <div className="img">
          <img src={`http://localhost:4000/${spaceData?.Images[0].imageUrl}`} />
        </div>
        <div className="text">
          <p>{spaceData?.spaceName}</p>
          <p>{spaceData?.spaceLocation}</p>
        </div>
      </div>
      <div>예약이 완료되었습니다!</div>
    </SuccessStyled>
  );
};
export default Success;
function getSpaceById(arg0: number) {
  throw new Error('Function not implemented.');
}
