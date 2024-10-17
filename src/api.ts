import axios from 'axios';

//url가져오기
const API_URL = 'localhost:4000/api/user/signup';
interface signupData {
    email: string;
    password: string;
    role: string;
    agreed: boolean;
}
