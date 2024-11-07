import { CouponData } from '@/types';
import axios from 'axios';

const isLocal = process.env.NODE_ENV === 'development';

const API_URL = `${
  isLocal
    ? `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}:${process.env.NEXT_PUBLIC_LOCAL_PORT}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
}/api/coupon/`;

export const SignupCoupon = async (couponData: CouponData) => {
  try {
    const response = await axios.post(`${API_URL}send-new-coupon`, couponData);
    return response.data;
  } catch (error) {
    console.error('쿠폰 오류', error);
    throw error;
  }
};

export const getUserAllCoupon = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}get-user-all-coupon`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('쿠폰 조회 실패', error);
    throw error;
  }
};

export const UserCouponIsUsed = async (userCouponId: number) => {
  try {
    const response = await axios.patch(`${API_URL}user-coupon-is-used`, {
      userCouponId,
    });
    return response.data;
  } catch (error) {
    console.error('쿠폰 상태 변경 실패', error);
    throw error;
  }
};
