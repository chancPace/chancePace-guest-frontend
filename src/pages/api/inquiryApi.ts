import { inquiryData } from '@/types';
import axios from 'axios';

const isLocal = process.env.NODE_ENV === 'development';

const API_URL = `${
  isLocal
    ? `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}:${process.env.NEXT_PUBLIC_LOCAL_PORT}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
}/api/inquiry`;

export const addInquiryApi = async (inquiryData: inquiryData) => {
  try {
    const response = await axios.post(`${API_URL}/add-inquiry`, inquiryData);
    return response.data;
  } catch (error) {
    console.error('문의등록 실패,', error);
    throw error;
  }
};
