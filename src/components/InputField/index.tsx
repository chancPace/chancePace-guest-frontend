import { Form, Input } from 'antd';
import { InputFieldStyled } from './styled';
import { Rule } from 'antd/es/form'; 

interface InputFieldProps {
    name: string;
    label: string;
    rules: Rule[]; 
    isPassword?: boolean; 
    dependencies?: string[];
}

const InputField = ({
    name,
    label,
    rules,
    isPassword,
    dependencies,
}: InputFieldProps) => {
    return (
        <InputFieldStyled>
            <Form.Item
                name={name}
                label={label}
                rules={rules}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="customFormItem"
                dependencies={dependencies}
            >
                {isPassword ? (
                    <Input.Password className="customInput" /> // 비밀번호 입력 필드
                ) : (
                    <Input className="customInput" /> // 일반 입력 필드
                )}
            </Form.Item>
        </InputFieldStyled>
    );
};

export default InputField;
