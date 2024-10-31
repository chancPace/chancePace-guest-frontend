import { BookingData } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/booking';

export const addBooking = async (bookingData:BookingData) => {
  try {
    const response = await axios.post(`${API_URL}/add-booking`,bookingData);
    return response.data;
  } catch (error) {
    console.error('예약 저장 실패', error);
    throw error;
  }
};
