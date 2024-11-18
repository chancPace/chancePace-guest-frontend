import { getFindPassword } from '@/pages/api/nodemailerApi';
import { FindPasswordStyled } from './styled';
import { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useFormik } from 'formik';
import { updatePassword } from '@/pages/api/userApi';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

const FindPassword = () => {
  const router = useRouter();
  //코드 발송 여부
  const [isCodeSent, setIsCodeSent] = useState(false);
  //서버에서 받은 인증코드 저장
  const [serverAuthCode, setServerAuthCode] = useState<string>('');
  //이메일 인증 완료 여부
  const [isVerified, setIsVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
      authCode: '',
    },
    validate: (values) => {
      const errors: { passwordError?: string; confirmError?: string } = {};
      if (
        !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,15}/.test(
          values.password
        )
      ) {
        errors.passwordError =
          '영문, 숫자, 특수문자를 포함하여 10-15자로 입력해주세요.';
      }
      if (values.password !== values.confirm) {
        errors.confirmError = '새 비밀번호가 일치하지 않습니다.';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await updatePassword(values.email, values.password);
        message.success('비밀번호가 변경되었습니다.');
        router.push('/login');
      } catch (error) {
        console.error('비밀번호 변경 실패', error);
      }
    },
  });

  const handleSendPasswordAuthCode = async () => {
    try {
      const response = await getFindPassword(formik.values.email);
      message.success(response.message);
      if (response.result) {
        setIsCodeSent(true);
        setServerAuthCode(response.authNumber);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        if (axiosError.response.status === 404) {
          message.error('존재하지 않는 회원입니다');
        }
      }
    }
  };

  const handleVerifyCode = () => {
    if (formik.values.authCode === serverAuthCode) {
      message.success('이메일 인증이 완료되었습니다.');
      setIsVerified(true);
      setIsCodeSent(false);
    } else {
      message.error('인증 코드가 일치하지 않습니다.');
      setIsVerified(false);
    }
  };

  return (
    <FindPasswordStyled>
      <div className="logo">ChancePace</div>
      <div className="title">비밀번호 찾기</div>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-box">
          <Input
            type="text"
            name="email"
            placeholder="이용중인 이메일을 입력해주세요"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          <Button htmlType="button" onClick={handleSendPasswordAuthCode}>
            인증받기
          </Button>
        </div>
        {isCodeSent === true && (
          <div className="input-box">
            <Input
              type="number"
              name="authCode"
              onChange={formik.handleChange}
              value={formik.values.authCode}
              placeholder="인증번호를 입력해주세요"
            />
            <Button htmlType="button" onClick={handleVerifyCode}>
              인증하기
            </Button>
          </div>
        )}
        {isVerified === true && (
          <div className="new-password">
            <div>
              <Input
                type="password"
                name="password"
                placeholder="새 비밀번호를 입력해주세요"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Input
                type="password"
                placeholder="비밀번호 확인"
                name="confirm"
                onChange={formik.handleChange}
                value={formik.values.confirm}
              />
            </div>
            <Button htmlType="submit">변경</Button>
          </div>
        )}
      </form>
    </FindPasswordStyled>
  );
};
export default FindPassword;
