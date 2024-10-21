import { Button } from 'antd';
import Buttons from '../Buttons';
import { HostStyled } from './styled';
import { hostMainImg, explanation, procedure } from '@/utill/datas';
import HostMain from '../HostMain';
import HostInfo from '../HostInfo';
import HostProcedure from '../HostProcedure';
import { GrNext } from 'react-icons/gr';


const Host = () => {
    // console.log(hostMainImg, '호스트');
    console.log(explanation);
    return (
        <HostStyled>
            <HostMain />
            <p className="infoTitle">Business</p>
            <div className="hostInfo">
                {explanation?.map((x, i) => {
                    return <HostInfo x={x} i={i} />;
                })}
            </div>

            <p className="procedureTitle">개설 과정 안내</p>
            <div className="hostProcedure">
                {procedure?.map((x, i) => {
                    return <HostProcedure x={x} i={i}/>;
                })}
            </div>
            <div className="go">
                <p>Let's work together!</p>
                <Button className="hostButton">
                    <a href="http://localhost:3001/">호스트 등록하기</a>
                </Button>
            </div>
        </HostStyled>
    );
};
export default Host;
