import axios from 'axios';

//url가져오기
const API_URL = 'localhost:4000/api/user/signup';
interface signupData {
    email: string;
    password: string;
    role: string;
    agreed: boolean;
}

export const postSignup = async (userData: signupData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error('회원가입 요청 중 오류:', error);

        throw error;
    }
};
