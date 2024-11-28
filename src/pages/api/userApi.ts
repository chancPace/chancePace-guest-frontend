import axios, { AxiosError } from 'axios';
import { SignupData, LoginData, UserData, ErrorResponse } from '@/types';
import Cookies from 'js-cookie';

const isLocal = process.env.NODE_ENV === 'development';

const API_URL = `${
  isLocal
    ? `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}:${process.env.NEXT_PUBLIC_LOCAL_PORT}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
}/api/user`;

export const postSignup = async (userData: SignupData) => {
  try {
    //axios.post(): 첫번째-> url, 두번째 -> 보낼 데이터
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLogin = async (userData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    // console.log('Server Response:', response.status, response.data);

    return response.data;
  } catch (error) {
    // console.error('로그인 요청 중 오류', axiosError.message);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('회원정보 요청 중 오류', axiosError.message);
    throw axiosError;
  }
};

export const checkPassword = async (password: string) => {
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${API_URL}/check-password`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('비밀번호 확인 중 오류 발생:', error);
    throw error;
  }
};

export const patchProfile = async (updateData: UserData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/update-my-profile`,
      updateData
    );

    return response.data;
  } catch (error) {
    console.error('회원 정보 수정 중 오류 발생', error);
    throw error;
  }
};

export const updatePassword = async (email: string, password: string) => {
  try {
    await axios.patch(`${API_URL}/update-password`, {
      email,
      password,
    });
  } catch (error) {
    console.error('비밀번호 변경 실패', error);
    throw error;
  }
};
