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
    } catch (error: any) {
        // 1. 서버로부터 응답이 있는 경우
        if (error.response) {
            console.error('서버 응답 상태 코드:', error.response.status); // HTTP 상태 코드
            console.error('서버 응답 데이터:', error.response.data); // 서버가 반환한 데이터
            console.error('서버 응답 헤더:', error.response.headers); // 서버 응답 헤더

            // 사용자가 볼 수 있는 오류 메시지를 표시
            alert(`서버 오류 발생: ${error.response.data.message}`);
        }
        // 2. 요청이 전송되었지만 서버에서 응답이 없는 경우
        else if (error.request) {
            console.error(
                '요청이 서버에 도달했으나 응답이 없습니다:',
                error.request
            );
        }
        // 3. 요청을 보내기 전에 발생한 오류 (예: 잘못된 설정)
        else {
            console.error('요청 설정 중 오류 발생:', error.message);
        }

        // 오류 스택 출력 (추가적인 정보)
        console.error('오류 스택:', error.stack);

        throw error; // 오류를 다시 던져서 상위 컴포넌트에서 처리하게 할 수 있음
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
