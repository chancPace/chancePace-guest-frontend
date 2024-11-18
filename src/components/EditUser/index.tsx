import { UserData } from '@/types';
import { EditUserStyled } from './styled';
import { Collapse, Input, message, Select } from 'antd';
import { checkPassword, patchProfile } from '@/pages/api/userApi';
import { useDispatch } from 'react-redux';
import { logout, updateUserProfile } from '@/redux/slices/userSlice';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Buttons from '../Buttons';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { persistor } from '@/redux/store';
const { Panel } = Collapse;

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
  const [passwordError, setPasswordError] = useState<String>('');

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

  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(logout());
    persistor.purge();
    router.replace('/');
  };

  //프로필 수정
  const profileFormik = useFormik({
    initialValues: {
      userName: userData?.userName || '',
      phoneNumber: userData?.phoneNumber || '',
      bankAccountName: userData?.bankAccountName || '',
      bankAccountOwner: userData?.bankAccountOwner || '',
      bankAccountNumber: userData?.bankAccountNumber || '',
    },
    validate: (values) => {
      const errors: { phoneNumber?: string } = {};

      if (!values.phoneNumber) {
        errors.phoneNumber = '전화번호를 입력해주세요.';
      } else if (values.phoneNumber.replace(/\D/g, '').length !== 11) {
        errors.phoneNumber = '전화번호는 11자리 숫자여야 합니다.';
      }

      return errors;
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

  //핸드폰 번호 형태 바꾸기
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    }

    return phoneNumber;
  };

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

  const passwordCheckFormik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await checkPassword(values.password);
        if (response.result) {
          setIsPasswordConfirm(true);
          setShowPasswordInput(false);
          message.success('비밀번호 인증에 성공했습니다. 수정이 가능합니다.');
          setPasswordError('');
        }
      } catch (error) {
        setPasswordError('비밀번호가 일치하지 않습니다');
      }
    },
  });

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
          return;
        }
        const updateData = {
          id: userData?.id as number,
          password: values.newPassword,
        };
        const response = await patchProfile(updateData);
        message.success(response.message || '비밀번호가 변경되었습니다.');
        passwordFormik.resetForm();
        setPasswordError('');
      } catch (error) {
        setPasswordError('기존 비밀번호가 일치하지 않습니다');
      }
    },
    validate: (values) => {
      const errors: {
        newPassword?: string;
        confirmNewPassword?: string;
      } = {};
      if (
        !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,15}/.test(
          values.newPassword
        )
      ) {
        errors.newPassword =
          '영문, 숫자, 특수문자를 포함하여 10-15자로 입력해주세요.';
      }

      // 새 비밀번호와 확인 비밀번호가 일치하는지 검증
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
                <form onSubmit={passwordCheckFormik.handleSubmit}>
                  <Input.Password
                    name="password"
                    value={passwordCheckFormik.values.password}
                    placeholder="비밀번호 확인"
                    onChange={passwordCheckFormik.handleChange}
                    required
                  />
                  <p className="error">{passwordError || ''}</p>
                  <Buttons text="비밀번호 확인" />
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={profileFormik.handleSubmit}>
              <label>이메일</label>
              <Input
                name="email"
                placeholder="이메일"
                value={userData?.email}
                readOnly
              />
              <label>이름</label>
              <Input
                name="userName"
                placeholder="사용자 이름"
                onChange={profileFormik.handleChange}
                value={profileFormik.values.userName}
              />
              <label>휴대폰 번호</label>
              <Input
                name="phoneNumber"
                placeholder="휴대폰 번호 (숫자만 입력해주세요)"
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value);
                  profileFormik.setFieldValue('phoneNumber', formattedValue);
                }}
                value={profileFormik.values.phoneNumber}
              />
              {profileFormik.errors.phoneNumber && (
                <div className="error">{profileFormik.errors.phoneNumber}</div>
              )}
              {userData?.role === 'HOST' && (
                <>
                  <label>은행명</label>
                  <Select
                    placeholder="은행명"
                    options={bankOpt}
                    onChange={(value) =>
                      profileFormik.setFieldValue('bankAccountName', value)
                    }
                    value={profileFormik.values.bankAccountName}
                  />
                  <label>계좌 소유주</label>
                  <Input
                    name="bankAccountOwner"
                    placeholder="계좌 소유주"
                    onChange={profileFormik.handleChange}
                    value={profileFormik.values.bankAccountOwner}
                  />
                  <label>계좌번호</label>
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
            <p className="error">{passwordError || ''}</p>

            <Input.Password
              name="newPassword"
              placeholder="새 비밀번호"
              onChange={passwordFormik.handleChange}
              value={passwordFormik.values.newPassword}
            />
            <p className="error">
              {passwordFormik.touched.newPassword &&
              passwordFormik.errors.newPassword
                ? passwordFormik.errors.newPassword
                : ''}
            </p>
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
            <Buttons text="비밀번호 변경"></Buttons>
          </form>
        </Panel>
      </Collapse>
      <p className="logout" onClick={handleLogout}>
        로그아웃
      </p>
    </EditUserStyled>
  );
};

export default EditUser;
