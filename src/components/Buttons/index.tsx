import { Button } from 'antd';
import { ButtonsStyled } from './styled';
interface ButtonsProps {
    loading?: boolean;
    text?: string;
}
const Buttons = ({ loading, text }: ButtonsProps) => {
    return (
        <ButtonsStyled>
            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="customButton"
            >
                {text}
            </Button>
        </ButtonsStyled>
    );
};

export default Buttons;
