import axios from 'axios';

const isLocal = process.env.NODE_ENV === 'development';

const API_URL = `${
  isLocal
    ? `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}:${process.env.NEXT_PUBLIC_LOCAL_PORT}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
}/api/nodemailer`;

export const sendAuthNumber = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-auth-number`, { email });
    console.log(response,'리스펀스')
    return response.data;
  } catch (error) {
    console.error('이메일 인증 실패', error);
    throw error;
  }
};
