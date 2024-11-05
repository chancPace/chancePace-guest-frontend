import { CouponData } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/coupon/';

export const SignupCoupon = async (couponData: CouponData) => {
  try {
    const response = await axios.post(`${API_URL}send-new-coupon`, couponData);
    return response.data;
  } catch (error) {
    console.error('쿠폰 오류', error);
    throw error;
  }
};
