import { BookingData } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/booking';

export const addBooking = async (bookingData: BookingData) => {
  try {
    const response = await axios.post(`${API_URL}/add-booking`, bookingData);
    console.log(response,'리스폰스부킹')
    return response.data;
  } catch (error) {
    console.error('예약 저장 실패', error);
    throw error;
  }
};

export const getBooking = async (spaceId: number, formattedDate: string) => {
  try {
    const response = await axios.get(`${API_URL}/get-booking-by-space`, {
      params: { spaceId, startDate: formattedDate }, // selectedDate를 startDate로 서버에 전달
    });
    return response.data; // 데이터 반환
  } catch (error) {
    console.error('예약된 시간 조회 실패', error);
    throw error;
  }
};

export const getAllBooking = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-booking`);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error('예약데이터 조회 실패', error);
    throw error;
  }
};
