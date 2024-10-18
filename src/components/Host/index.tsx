import { Button } from 'antd';
import Buttons from '../Buttons';
import { HostStyled } from './styled';

const Host = () => {
    return (
        <HostStyled>
            <p className="mainTitle">Share Your Space</p>
            <Button>
                <a href="http://localhost:3001/">호스트 등록하기</a>
            </Button>
        </HostStyled>
    );
};
export default Host;
