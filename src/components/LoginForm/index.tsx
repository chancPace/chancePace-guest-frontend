import InputField from '../InputField';
import { LoginStyled } from './styled';
import { Form, message } from 'antd';
import Buttons from '../Buttons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { postLogin } from '@/pages/api/userApi';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginSuccess } from '@/redux/slices/userSlice';
import { AxiosError } from 'axios'; // AxiosError 타입을 import
import { LoginData } from '@/types';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleLogin = async (values: LoginData) => {
    const { email, password } = values;
    try {
      const response = await postLogin({ email, password });
      console.log(response, 'response');
      if (response.token) {
        setEmailError(null);
        setPasswordError(null);
        Cookies.set('token', response.token, { expires: 1 });
        message.success('로그인 성공');
        // console.log('loginSuccess payload:', action.payload);

        dispatch(
          loginSuccess({
            email: response.data.email,
            userName: response.data.userName,
            role: response.data.role,
            token: response.token,
            id: response.data.id,
            phoneNumber: response.data.phoneNumber,
          })
        );
        router.push('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError; // error를 AxiosError로 캐스팅

      if (axiosError.response && axiosError.response.status === 404) {
        setEmailError('존재하지 않는 회원입니다.');
      } else if (axiosError.response && axiosError.response.status === 401) {
        setPasswordError('비밀번호가 틀렸습니다');
      } else {
        message.error('로그인에 실패했습니다.');
      }
    }
  };
  return (
    <LoginStyled>
      <p className="formLogo">ChancePace</p>

      <Form
        name="signup"
        className="form"
        onFinish={handleLogin}
        initialValues={{
          email: 'test1@daum.net', // 기본값으로 설정할 이메일
          password: 'password1234!', // 기본값으로 설정할 비밀번호
        }}
      >
        <InputField
          name={'email'}
          label={'email'}
          rules={[
            { required: true, message: '아이디를 입력해주세요' },
            {
              validator: () =>
                emailError
                  ? Promise.reject(new Error(emailError))
                  : Promise.resolve(),
            },
          ]}
        ></InputField>
        <InputField
          name={'password'}
          label={'비밀번호'}
          rules={[
            { required: true, message: '비밀번호를 입력해주세요' },
            {
              validator: () =>
                passwordError
                  ? Promise.reject(new Error(passwordError))
                  : Promise.resolve(),
            },
          ]}
          isPassword
        ></InputField>
        <Buttons text="로그인"></Buttons>
        <div>
          <Link href="/signup" passHref>
            <span className="span1">아직 회원이 아니신가요?</span>
          </Link>
          <Link href="/signup" passHref>
            <span>아이디/비밀번호 찾기</span>
          </Link>
        </div>
      </Form>
    </LoginStyled>
  );
};
export default LoginForm;
