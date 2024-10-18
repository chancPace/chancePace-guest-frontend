import { Button } from 'antd';
import { ButtonsStyled } from './styled';
interface ButtonsProps {
    onClick: () => void;
    loading?: boolean;
    text?: string;
}
const Buttons = ({ onClick, loading, text }: ButtonsProps) => {
    return (
        <ButtonsStyled>
            <Button
                type="primary"
                htmlType="submit"
                onClick={onClick}
                loading={loading}
                className="customButton"
            >
                {text}
            </Button>
        </ButtonsStyled>
    );
};

export default Buttons;
