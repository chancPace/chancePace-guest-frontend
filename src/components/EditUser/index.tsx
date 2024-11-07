import { UserData } from '@/types';
import { EditUserStyled } from './styled';
import { Collapse, Input, message, Select } from 'antd';
import { AxiosError } from 'axios';
import { checkPassword, patchProfile } from '@/pages/api/userApi';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@/redux/slices/userSlice';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Buttons from '../Buttons';
import { useEffect } from 'react';
const { Panel } = Collapse;

interface ErrorResponseData {
  message: string;
}
interface UserAccountFormProps {
  userData: UserData | null;
  setUserData: (user: UserData) => void;
  isPasswordConfirm: boolean;
  setIsPasswordConfirm: (value: boolean) => void;
  showPasswordInput: boolean;
  setShowPasswordInput: (value: boolean) => void;
}

const EditUser = ({
  userData,
  isPasswordConfirm,
  setIsPasswordConfirm,
  showPasswordInput,
  setShowPasswordInput,
  setUserData,
}: UserAccountFormProps) => {
  const dispatch = useDispatch(); // 디스패치 훅 추가
  const router = useRouter();
  const bankOpt = [
    { value: 'KB', label: '국민은행' },
    { value: 'IBK', label: '기업은행' },
    { value: 'WOORI', label: '우리은행' },
    { value: 'NH', label: '농협은행' },
    { value: 'SHINHAN', label: '신한은행' },
    { value: 'HANA', label: '하나은행' },
    { value: 'CITI', label: '한국씨티은행' },
    { value: 'SC', label: 'SC제일은행' },
    { value: 'DGB', label: '대구은행' },
    { value: 'BNK', label: '부산은행' },
    { value: 'GJB', label: '광주은행' },
    { value: 'JB', label: '전북은행' },
    { value: 'KBN', label: '경남은행' },
    { value: 'Jeju', label: '제주은행' },
  ];

  //프로필 수정
  const profileFormik = useFormik({
    initialValues: {
      userName: userData?.userName || '',
      phoneNumber: userData?.phoneNumber || '',
      bankAccountName: userData?.bankAccountName || '',
      bankAccountOwner: userData?.bankAccountOwner || '',
      bankAccountNumber: userData?.bankAccountNumber || '',
    },
    onSubmit: async (values) => {
      try {
        const updateData = {
          id: userData?.id as number,
          email: userData?.email,
          ...values,
        };
        const response = await patchProfile(updateData);
        message.success(response.message || '회원 정보가 업데이트되었습니다.');
        dispatch(updateUserProfile(updateData));
        setUserData({ ...userData, ...updateData });
        router.push('/');
      } catch (error) {
        console.error('회원 정보 업데이트 중 오류가 발생했습니다.', error);
      }
    },
  });

  //userData가 변경될때마다 input에 값 띄우기
  useEffect(() => {
    if (userData) {
      profileFormik.setValues({
        userName: userData.userName || '',
        phoneNumber: userData.phoneNumber || '',
        bankAccountName: userData.bankAccountName || '',
        bankAccountOwner: userData.bankAccountOwner || '',
        bankAccountNumber: userData.bankAccountNumber || '',
      });
    }
  }, [userData]);

  //비밀번호 인증하기
  const handlePasswordCheck = async (password: string) => {
    try {
      const isConfirmed = await checkPassword(password);
      if (isConfirmed) {
        setIsPasswordConfirm(true);
        setShowPasswordInput(false);
        message.success('비밀번호 인증에 성공했습니다. 수정이 가능합니다.');
      } else {
        message.error('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      if (axiosError.response?.data?.message) {
        message.error(
          axiosError.response.data.message || '비밀번호가 틀렸습니다.'
        );
      } else {
        message.error('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };

  //비밀번호 변경
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async (values) => {
      try {
        const isConfirmed = await checkPassword(values.currentPassword);
        if (!isConfirmed) {
          message.error('기존 비밀번호가 일치하지 않습니다.');
          return;
        }
        const updateData = {
          id: userData?.id as number,
          password: values.newPassword,
        };
        const response = await patchProfile(updateData);
        message.success(response.message || '비밀번호가 변경되었습니다.');
        passwordFormik.resetForm();
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;
        message.error(
          axiosError.response?.data?.message ||
            '비밀번호 변경 중 오류가 발생했습니다.'
        );
      }
    },
    validate: (values) => {
      const errors: { newPassword?: string; confirmNewPassword?: string } = {};
      if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = '새 비밀번호가 일치하지 않습니다.';
      }
      return errors;
    },
  });

  return (
    <EditUserStyled>
      <Collapse defaultActiveKey={['1']} accordion>
        <Panel header="회원 정보 수정" key="1">
          {!isPasswordConfirm ? (
            <div className="confirm">
              {showPasswordInput && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const password = e.currentTarget.password.value;
                    handlePasswordCheck(password);
                  }}
                >
                  <Input.Password
                    name="password"
                    placeholder="비밀번호 확인"
                    required
                  />
                  <Buttons text="비밀번호 확인" />
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={profileFormik.handleSubmit}>
              <Input
                name="email"
                placeholder="이메일"
                value={userData?.email}
                readOnly
              />
              <Input
                name="userName"
                placeholder="사용자 이름"
                onChange={profileFormik.handleChange}
                value={profileFormik.values.userName}
              />
              <Input
                name="phoneNumber"
                placeholder="휴대폰 번호"
                onChange={profileFormik.handleChange}
                value={profileFormik.values.phoneNumber}
              />
              {userData?.role === 'HOST' && (
                <>
                  <Select
                    placeholder="은행명"
                    options={bankOpt}
                    onChange={(value) =>
                      profileFormik.setFieldValue('bankAccountName', value)
                    }
                    value={profileFormik.values.bankAccountName}
                  />
                  <Input
                    name="bankAccountOwner"
                    placeholder="계좌 소유주"
                    onChange={profileFormik.handleChange}
                    value={profileFormik.values.bankAccountOwner}
                  />
                  <Input
                    name="bankAccountNumber"
                    placeholder="계좌 번호"
                    onChange={profileFormik.handleChange}
                    value={profileFormik.values.bankAccountNumber}
                  />
                </>
              )}
              <Buttons text="저장" />
            </form>
          )}
        </Panel>

        <Panel header="비밀번호 변경" key="2">
          <form onSubmit={passwordFormik.handleSubmit} className="form">
            <Input.Password
              name="currentPassword"
              placeholder="기존 비밀번호"
              onChange={passwordFormik.handleChange}
              value={passwordFormik.values.currentPassword}
            />
            <Input.Password
              name="newPassword"
              placeholder="새 비밀번호"
              onChange={passwordFormik.handleChange}
              value={passwordFormik.values.newPassword}
            />
            <Input.Password
              name="confirmNewPassword"
              placeholder="새 비밀번호 확인"
              onChange={passwordFormik.handleChange}
              value={passwordFormik.values.confirmNewPassword}
            />
            {passwordFormik.errors.confirmNewPassword && (
              <p className="error">
                {passwordFormik.errors.confirmNewPassword || ''}
              </p>
            )}
            <Buttons text="비밀번호 변경">{/* 비밀번호 변경 */}</Buttons>
          </form>
        </Panel>
      </Collapse>
    </EditUserStyled>
  );
};

export default EditUser;
