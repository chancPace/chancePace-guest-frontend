import { Button } from 'antd';
import Buttons from '../Buttons';
import { HostStyled } from './styled';
import { hostMainImg, explanation } from '@/utill/datas';
import HostMain from '../HostMain';
import HostInfo from '../HostInfo';
import HostProcedure from '../HostProcedure';

const Host = () => {
    // console.log(hostMainImg, '호스트');
    console.log(explanation);
    return (
        <HostStyled>
            <HostMain />
            <p className='infoTitle'>Business</p>
            <HostInfo />
            <p className='procedureTitle'>개설 과정 안내</p>

            <HostProcedure />
            <div className="go">
                <p>Let's work together!</p>
                <Button className='hostButton'>
                    <a href="http://localhost:3001/">호스트 등록하기</a>
                </Button>
            </div>
        </HostStyled>
    );
};
export default Host;
