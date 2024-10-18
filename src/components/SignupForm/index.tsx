import { SignupFormStyled } from './styled';
import { Form, message, FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import InputField from '../InputField';
import CheckboxGroup from '../CheckboxGroup';
import { postSignup } from '@/pages/api/api';
import Buttons from '../Buttons';
import { RuleObject } from 'antd/es/form';
import { AxiosError } from 'axios';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckBoxItem {
    value: string;
    children: string;
    checked: boolean;
    required: boolean;
}

interface SignupValues {
    email: string;
    password: string;
}
const SignupForm = () => {
    //체크박스의 정보를 담고 있는 상태 배열
    const [smallCheckBoxs, setSmallCheckBoxs] = useState<CheckBoxItem[]>([
        {
            value: 'check1', //체크박스 고유값
            children: '서비스 이용 약관(필수)', //체크박스 옆에 표시될 텍스트
            checked: false, //체크박스가 선택되었는지
            required: true, //해당 체크박스 선택이 필수인지 구분
        },
        {
            value: 'check2',
            children: '개인정보 수집 이용 (필수)',
            checked: false,
            required: true,
        },
        {
            value: 'check3',
            children: '마케팅 정보 수신 동의 (선택)',
            checked: false,
            required: false,
        },
    ]);

    //모든 체크박스가 선택되었는지
    const [isAllChecked, setIsAllChecked] = useState(false);
    //필수 체크박스가 선택되지 않았을 경우의 에러 메세지
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태 추가

    //전체 체크박스 선택
    const onAllCheck = (e: CheckboxChangeEvent) => {
        //체크박스 상태 가져오기
        const checked = e.target.checked;
        //체크박스의 상태 업데이트
        setIsAllChecked(checked);
        //모든 체크박스의 checked상태를 업데이트
        setSmallCheckBoxs(
            smallCheckBoxs.map((x) => ({ ...x, checked: checked }))
        );
    };

    //개별 체크박스 선택
    const onSingleCheck = (e: CheckboxChangeEvent) => {
        //클릭한 체크박스의 값을 저장
        const targetValue = e.target.value;
        setSmallCheckBoxs(
            smallCheckBoxs.map((checkBox) =>
                targetValue === checkBox.value
                    ? //해당 체크박스의 checked상태를 반전시킴
                      { ...checkBox, checked: !checkBox.checked }
                    : checkBox
            )
        );
    };

    //개별 체크박스가 변경될때마다 호출되어 모든 체크박스가 선택되면 전체 체크박스 상태를 업데이트
    //every(): 배열에 모든 요소가 특정 조건을 만족하는지 확인될때 사용
    useEffect(() => {
        setIsAllChecked(smallCheckBoxs.every((x) => x.checked));
    }, [smallCheckBoxs]);

    //회원가입 처리 함수
    //values-> 폼 필드의 값들
    const handleSignup = async (values: SignupValues) => {
        const { email, password } = values;
        const allChecked = smallCheckBoxs.every((checkbox) => {
            if (checkbox.required) {
                return checkbox.checked; // 필수 체크박스가 선택되어야 함
            }
            return true; // 선택이 필요 없는 체크박스는 무시
        });

        //필수 체크박스가 선택되지 않았을경우 에러 메세지
        if (!allChecked) {
            setErrorMessage('필수 항목을 동의해주세요');
            return;
        }
        //선택인 체크박스 중 하나라도 선택된게 있는지 확인
        const isOptionalChecked = smallCheckBoxs
            .filter((checkbox) => !checkbox.required)
            .some((checkbox) => checkbox.checked);
        const agreed = allChecked || isOptionalChecked;
        const role = 'user';
        try {
            const response = await postSignup({
                email,
                password,
                role,
                agreed,
            });
            message.success(response.message);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                message.error(error.response?.data?.message || '회원가입 실패');
                console.error('회원가입 요청 중 오류:', error);
            } else {
                message.error('알 수 없는 오류가 발생했습니다.');
                console.error('알 수 없는 오류:', error);
            }
        }
    };

    return (
        <SignupFormStyled>
            <p className="formLogo">ChancePace</p>
            {/* onFinish: 폼이 성공적으로 전송될때 */}
            <Form name="signup" className="form" onFinish={handleSignup}>
                <InputField
                    name="email"
                    label="이메일"
                    // 입력 검증 규칙 설정
                    rules={[
                        { required: true, message: '이메일을 입력해주세요' },
                        {
                            type: 'email',
                            message: '메일주소가 유효하지 않습니다',
                        },
                    ]}
                />
                <InputField
                    name="password"
                    label="비밀번호"
                    rules={[
                        { required: true, message: '비밀번호를 입력해주세요' },
                    ]}
                    isPassword
                />
                <InputField
                    name="confirm"
                    label="비밀번호 확인"
                    // password필드의 값에 의존한다는 뜻 
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '비밀번호를 입력해주세요' }, // 비밀번호 확인이 비어 있을 때의 메시지
                        ({
                            getFieldValue,
                        }: {
                            getFieldValue: FormInstance['getFieldValue'];
                        }) => ({
                            // validator: 사용자 정의 검증 함수 
                            validator(_: RuleObject, value: string) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('비밀번호가 일치하지 않습니다.')
                                );
                            },
                        }),
                    ]}
                    isPassword
                />
                <Form.Item>
                    <CheckboxGroup
                        checkboxes={smallCheckBoxs}
                        onAllCheck={onAllCheck}
                        onSingleCheck={onSingleCheck}
                        isAllChecked={isAllChecked}
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </Form.Item>
                <Form.Item>
                    <Buttons
                        onClick={() => console.log('회원가입 클릭')}
                        loading={false}
                        text="회원가입"
                    />
                </Form.Item>
            </Form>
        </SignupFormStyled>
    );
};

export default SignupForm;
