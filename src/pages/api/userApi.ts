import axios, { AxiosError } from 'axios';
import { SignupData, LoginData } from '@/types';

//url가져오기
const API_URL = 'http://localhost:4000/api/user/';

interface ErrorResponseData {
    message: string;
}
export const postSignup = async (userData: SignupData) => {
    try {
        //axios.post(): 첫번째-> url, 두번째 -> 보낼 데이터
        const response = await axios.post(`${API_URL}signup`, userData);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;

        if (axiosError.response) {
            alert(`서버 오류 발생: ${axiosError.response.data.message}`);
        } else if (axiosError.request) {
            alert('서버 응답이 없습니다.');
        } else {
            alert('요청 처리 중 오류가 발생했습니다.');
        }

        throw error; // 오류를 다시 던져서 상위에서 처리하게 할 수 있음
    }
};

export const postLogin = async (userData: LoginData) => {
    try {
        const response = await axios.post(`${API_URL}login`, userData);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log('로그인 요청 중 오류', axiosError.message);
        throw axiosError;
    }
};
