import { LoginStyled } from './styled';
import { Input, message } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { postLogin } from '@/pages/api/userApi';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginSuccess } from '@/redux/slices/userSlice';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Buttons from '../Buttons';
import { ErrorResponse } from '@/types';
import Image from 'next/image';
import logo from '../../assets/image/2.png';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: 'gksthddl43@daum.net',
      password: 'password1234!',
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const response = await postLogin({ email, password });

        if (response.token) {
          setEmailError(null);
          setPasswordError(null);
          Cookies.set('token', response.token, { expires: 1 });
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
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError.response?.data?.message || '';
        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            setPasswordError(null);
            setEmailError(errorMessage);
          } else if (axiosError.response.status === 401) {
            setEmailError(null);
            setPasswordError(errorMessage);
          } else {
            message.error('로그인에 실패했습니다.');
            setEmailError(null);
            setPasswordError(null);
          }
        } else {
          message.error('서버와의 연결에 실패했습니다.');
        }
      }
    },
  });

  return (
    <LoginStyled>
      <form onSubmit={formik.handleSubmit} className="form">
        <Link href={'/'}>
          <Image src={logo} alt="Logo" className="formLogo" />
        </Link>
        <Input
          name="email"
          placeholder="이메일"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          required
        />
        <p className="error">{emailError}</p>

        <Input.Password
          name="password"
          placeholder="비밀번호"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          required
        />
        <p className="error">{passwordError}</p>
        <Buttons text="로그인"></Buttons>
        <div className="loginform-footer">
          <Link href="/signup" passHref>
            <span className="span1">아직 회원이 아니신가요?</span>
          </Link>
          <Link href="/findpassword" passHref>
            <span className="span1">비밀번호 찾기</span>
          </Link>
        </div>
      </form>
    </LoginStyled>
  );
};

export default LoginForm;
