import { postLogin } from '@/pages/api/api';
import InputField from '../InputField';
import { LoginStyled } from './styled';

interface loginvalues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const handleLogin = async (values: loginvalues) => {};
    return (
        <LoginStyled>
            <InputField name={'email'} label={'email'} rules={[]}></InputField>
            <InputField
                name={'password'}
                label={'비밀번호'}
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
            ></InputField>
        </LoginStyled>
    );
};
export default LoginForm;
