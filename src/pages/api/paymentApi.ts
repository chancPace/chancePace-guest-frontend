import { Payment } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/payment';

//브라우저 환경인지 확인하고 userInfo 가져오기 (서버측에서 렌더링하려하면 오류가 발생함)
const getUserInfoFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const persistedData = JSON.parse(
      localStorage.getItem('persist:root') || '{}'
    );
    const userInfoString = persistedData.userInfo;
    return userInfoString ? JSON.parse(userInfoString) : null;
  }
  return null;
};

export const verifyPayment = async (paymentData: Payment) => {
  try {
    const userInfo = getUserInfoFromLocalStorage();
    const token = userInfo?.token;
    const response = await axios.post(
      `${API_URL}/verify-payment`,
      {
        ...paymentData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('결제확인 요청 실패', error);
    throw error;
  }
};
