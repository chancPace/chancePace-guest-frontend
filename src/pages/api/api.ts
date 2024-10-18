import axios from 'axios';

//url가져오기
const API_URL = 'http://localhost:4000/api/user/';
interface signupData {
    email: string;
    password: string;
    role: string;
    agreed: boolean;
}
interface loginData {
    email: string;
    password: string;
}
export const postSignup = async (userData: signupData) => {
    try {
        //axios.post(): 첫번째-> url, 두번째 -> 보낼 데이터
        const response = await axios.post(`${API_URL}signup`, userData);
        return response.data;
    } catch (error) {
        console.error('회원가입 요청 중 오류:', error);

        throw error;
    }
};

export const postLogin = async (userData: loginData) => {
    try {
        const response = await axios.post(`${API_URL}login`, userData);
        return response.data;
    } catch (error) {
        console.log('로그인 요청 중 오류', error);
        throw error;
    }
};
