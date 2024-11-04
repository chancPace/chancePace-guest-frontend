import { useEffect } from 'react';
import { SuccessStyled } from './styled';
import { useRouter } from 'next/router';
import { verifyPayment } from '@/pages/api/paymentApi';
import { addBooking } from '@/pages/api/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
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
  } = router.query;
  const userId = useSelector((state: RootState) => state.user.userInfo?.id);

  useEffect(() => {
    const handleBooking = async () => {
      if (paymentKey && orderId && amount && userId) {
        try {
          const paymentResult = await verifyPayment({
            paymentKey: String(paymentKey),
            orderId: String(orderId),
            amount: Number(amount),
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
                ? parseInt(endTime[0]) + 1
                : parseInt(endTime || '0') + 1,
              userId,
              spaceId: Array.isArray(spaceId)
                ? parseInt(spaceId[0])
                : parseInt(spaceId || '0'),
              paymentId,
            };
            await addBooking(bookingData);
          }
        } catch (error) {
          console.error('예약 처리 실패', error);
        }
      }
    };
    handleBooking();
  }, [paymentKey, orderId, amount]);

  return (
    <SuccessStyled>
      <p>결제 성공</p>
    </SuccessStyled>
  );
};
export default Success;
