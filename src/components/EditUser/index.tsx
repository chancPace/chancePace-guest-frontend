import { UserData } from '@/types';
import { EditUserStyled } from './styled';
import { Button, Collapse, Form, Input, message, Radio, Select } from 'antd';
import { AxiosError } from 'axios';
import { checkPassword, patchProfile } from '@/pages/api/userApi';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@/redux/slices/userSlice';
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
  const [form] = Form.useForm();
  const dispatch = useDispatch(); // 디스패치 훅 추가

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

  const handlePasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    try {
      const isConfirme = await checkPassword(values.currentPassword);
      if (!isConfirme) {
        return;
      }
      const updateData = {
        id: userData?.id as number,
        password: values.newPassword,
      };
      const response = await patchProfile(updateData);
      message.success(response.message || '비밀번호가 변경되었습니다.');
      form.resetFields([
        'currentPassword',
        'newPassword',
        'confirmNewPassword',
      ]);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      if (axiosError.response?.status === 401) {
        message.error(axiosError.response.data.message);
      } else {
        message.error('비밀번호 확인 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const values = await form.validateFields();
      const updateData = {
        id: userData?.id as number,
        email: userData?.email,
        ...values,
      };
      const response = await patchProfile(updateData);
      message.success(response.message || '회원 정보가 업데이트되었습니다.');
      dispatch(updateUserProfile(updateData)); // 리덕스 업데이트
      setUserData({ ...userData, ...updateData }); // 로컬 상태 업데이트
    } catch (error) {
      console.error('회원 정보 업데이트 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <EditUserStyled>
      <Collapse defaultActiveKey={['1']} accordion>
        <Panel header="회원 정보 수정" key="1">
          {!isPasswordConfirm ? (
            <div className="confirm">
              {showPasswordInput && (
                <Form
                  layout="inline"
                  onFinish={(values) => handlePasswordCheck(values.password)}
                >
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '비밀번호를 입력하세요' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="button">
                    비밀번호 확인
                  </Button>
                </Form>
              )}
            </div>
          ) : (
            <Form form={form} layout="vertical">
              <Form.Item
                label="이메일"
                name="email"
                initialValue={userData?.email}
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item
                label="사용자 이름"
                name="userName"
                rules={[
                  { required: true, message: '사용자 이름을 입력하세요!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="휴대폰 번호"
                name="phoneNumber"
                rules={[
                  { required: true, message: '휴대폰 번호를 입력해주세요' },
                ]}
              >
                <Input placeholder="-포함하여 입력해주세요" />
              </Form.Item>
              <Form.Item
                label="성별"
                name="gender"
                initialValue={userData?.gender}
              >
                <Radio.Group>
                  <Radio value="MALE">남성</Radio>
                  <Radio value="FEMALE">여성</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="은행명"
                name="bankAccountName"
                initialValue={userData?.bankAccountName}
              >
                <Select options={bankOpt} />
              </Form.Item>

              <Form.Item
                label="계좌 소유주"
                name="bankAccountOwner"
                initialValue={userData?.bankAccountOwner}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="계좌 번호"
                name="bankAccountNumber"
                initialValue={userData?.bankAccountNumber}
              >
                <Input />
              </Form.Item>

              <Button
                type="primary"
                onClick={handleSaveProfile}
                className="button"
              >
                저장
              </Button>
            </Form>
          )}
        </Panel>

        <Panel header="비밀번호 변경" key="2">
          <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="기존 비밀번호"
              name="currentPassword"
              rules={[
                { required: true, message: '기존 비밀번호를 입력하세요' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="새 비밀번호"
              name="newPassword"
              rules={[{ required: true, message: '새 비밀번호를 입력하세요' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="새 비밀번호 확인"
              name="confirmNewPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '새 비밀번호 확인을 입력하세요' },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    const newPassword = getFieldValue('newPassword');
                    if (!value || newPassword === value) {
                      return;
                    }
                    throw new Error('새 비밀번호가 일치하지 않습니다.');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="button">
              비밀번호 변경
            </Button>
          </Form>
        </Panel>
      </Collapse>
    </EditUserStyled>
  );
};

export default EditUser;
