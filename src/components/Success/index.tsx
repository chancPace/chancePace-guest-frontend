import { useEffect } from 'react';
import { SuccessStyled } from './styled';
import { useRouter } from 'next/router';
import { verifyPayment } from '@/pages/api/paymentApi';
const Success = () => {
    const router = useRouter();
    const { paymentKey, orderId, amount } = router.query;

    useEffect(() => {
        if (paymentKey && orderId && amount) {
            verifyPayment({
                paymentKey: paymentKey as string,
                orderId: orderId as string,
                amount: Number(amount),
            });
        }
    }, [paymentKey, orderId, amount]);

    // const handleVerifyPayment = async (paymentData: Payment) => {
    //     try {
    //         const response = await verifyPayment(paymentData);
    //         console.log('결제 확인 응답:', response);
    //     } catch (error) {
    //         console.error('결제 확인 실패:', error);
    //     }
    // };

    return (
        <SuccessStyled>
            <p>결제 성공</p>
        </SuccessStyled>
    );
};
export default Success;
