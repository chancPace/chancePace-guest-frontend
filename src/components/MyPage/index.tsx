import { MyPageStyled } from './styled';
import { Tabs, Form, message, Input, Button, Collapse } from 'antd';
import { useEffect, useState } from 'react';
import { checkPassword, getUser, patchProfile } from '@/pages/api/userApi';
import { UserData } from '@/types';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
const { Panel } = Collapse;
interface ErrorResponseData {
  message: string;
}
const MyPage = () => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      router.replace('/');
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsPasswordConfirm(false);
        setShowPasswordInput(true);
        const response = await getUser();
        setUserData(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 오류 발생', error);
      }
    };
    fetchUserData();
  }, [form]);

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
    } catch (error) {
      console.error('회원 정보 업데이트 중 오류가 발생했습니다.', error);
    }
  };

  const tabItems = [
    {
      label: '계정정보',
      key: '1',
      children: (
        <div className="user-info">
          <div className="user-info-top">
            <div className="user-img"></div>
            <div className="user-id">{userData?.email}</div>
          </div>
          <div className="user-info-bottom">
            <Collapse defaultActiveKey={['1']} accordion>
              <Panel header="회원 정보 수정" key="1">
                {!isPasswordConfirm ? (
                  <div className="confirm">
                    {showPasswordInput && (
                      <Form
                        layout="inline"
                        onFinish={(values) =>
                          handlePasswordCheck(values.password)
                        }
                      >
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: '비밀번호를 입력하세요',
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                          비밀번호 확인
                        </Button>
                      </Form>
                    )}
                  </div>
                ) : (
                  <Form form={form} layout="vertical">
                    <Form.Item
                      label="사용자 이름"
                      name="userName"
                      rules={[
                        {
                          required: true,
                          message: '사용자 이름을 입력하세요!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="휴대폰 번호"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: '휴대폰 번호를 입력해주세요',
                        },
                      ]}
                    >
                      <Input placeholder="숫자만 입력해주세요" type="number" />
                    </Form.Item>
                    <Button type="primary" onClick={handleSaveProfile}>
                      저장
                    </Button>
                  </Form>
                )}
              </Panel>

              <Panel header="비밀번호 변경" key="2">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handlePasswordChange}
                >
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
                    rules={[
                      { required: true, message: '새 비밀번호를 입력하세요' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="새 비밀번호 확인"
                    name="confirmNewPassword"
                    dependencies={['newPassword']}
                    rules={[
                      {
                        required: true,
                        message: '새 비밀번호 확인을 입력하세요',
                      },
                      ({ getFieldValue }) => ({
                        async validator(_, value) {
                          const newPassword = getFieldValue('newPassword');
                          if (!value || newPassword === value) {
                            return;
                          }
                          throw new Error('새 비밀번호가 일치하지 않습니다.'); // 검증 실패 시 에러를 던짐
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    비밀번호 변경
                  </Button>
                </Form>
              </Panel>
            </Collapse>
          </div>
        </div>
      ),
    },
    {
      label: '예약내역',
      key: '2',
      children: '예약내역 목록',
    },
    {
      label: '문의내역',
      key: '3',
      children: '문의내역 목록',
    },
    {
      label: '리뷰내역',
      key: '4',
      children: '리뷰내역 목록',
    },
  ];

  return (
    <MyPageStyled>
      <Tabs tabPosition="left" items={tabItems} />
    </MyPageStyled>
  );
};

export default MyPage;
