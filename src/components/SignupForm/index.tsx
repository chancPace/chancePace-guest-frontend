import { SignupFormStyled } from './styled';
import { Button, Form, Input, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { ChangeEvent, Children, useEffect, useState } from 'react';
import { valueOrDefault } from 'chart.js/helpers';
import { small } from 'framer-motion/client';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const SignupForm = () => {
    const [smallCheckBoxs, setSmallCheckBoxs] = useState([
        {
            value: 'check1',
            children: '서비스 이용 약관(필수)',
            checked: false,
            className: 'round small',
        },
        {
            value: 'check2',
            children: '개인정보 수집 이용 (필수)',
            checked: false,
            className: 'round small',
        },
        {
            value: 'check3',
            children: '마케팅 정보 수신 동의 (선택)',
            checked: false,
            className: 'round small',
        },
    ]);

    const [isAllChecked, setIsAllChecked] = useState(false);

    // 체크박스 전체 선택 (모두 동의)
    const onAllCheck = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        setIsAllChecked(checked);
        if (checked) {
            setSmallCheckBoxs(
                smallCheckBoxs.map((x) => ({
                    ...x,
                    checked: true,
                }))
            );
        } else {
            setSmallCheckBoxs(
                smallCheckBoxs.map((x) => ({
                    ...x,
                    checked: false,
                }))
            );
        }

        setSmallCheckBoxs(
            smallCheckBoxs.map((checkBox) => ({
                ...checkBox,
                checked: checked,
            }))
        );
    };

    //체크박스 단일 선택
    const onSingleCheck = (e: CheckboxChangeEvent) => {
        const targetValue = e.target.value;
        setSmallCheckBoxs(
            smallCheckBoxs.map((checkBox) =>
                targetValue === checkBox.value
                    ? { ...checkBox, checked: !checkBox.checked }
                    : { ...checkBox }
            )
        );
    };

    useEffect(() => {
        setIsAllChecked(smallCheckBoxs.every((x) => x.checked));
    }, [smallCheckBoxs]);

    return (
        <SignupFormStyled>
            <Form name="signup" className="form">
                <Form.Item
                    className="customFormItem"
                    name="email"
                    label="email"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: '이메일을 입력해주세요',
                        },
                        {
                            type: 'email',
                            message: '메일주소가 유효하지 않습니다',
                        },
                    ]}
                >
                    <Input className="customInput" />
                </Form.Item>
                <Form.Item
                    className="customFormItem"
                    name="password"
                    label="비밀번호"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: '비밀번호를 입력해주세요',
                        },
                    ]}
                >
                    <Input.Password className="customInput" />
                </Form.Item>
                <Form.Item
                    className="customFormItem"
                    name="confirm"
                    label="비밀번호 확인"
                    labelCol={{ span: 24 }}
                    rules={[
                        { required: true, message: '비밀번호를 입력해주세요' },
                    ]}
                >
                    <Input.Password className="customInput" />
                </Form.Item>
                <Form.Item name="agreement">
                    <Checkbox
                        value="all"
                        checked={isAllChecked}
                        onChange={onAllCheck}
                        style={{marginBottom: '10px' }}
                    >   
                        아래 약관에 모두 동의합니다
                    </Checkbox>
                    <div>
                        {smallCheckBoxs.map((checkbox) => (
                            <div key={checkbox.value}>
                                <Checkbox
                                    value={checkbox.value}
                                    checked={checkbox.checked}
                                    onChange={onSingleCheck}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '5px',
                                    }}
                                >
                                    {checkbox.children}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                </Form.Item>
            </Form>
        </SignupFormStyled>
    );
};
export default SignupForm;
