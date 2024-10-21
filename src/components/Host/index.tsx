import { Button } from 'antd';
import { HostStyled } from './styled';
import { explanation, procedure } from '@/utill/datas';
import HostMain from '../HostMain';
import HostInfo from '../HostInfo';
import HostProcedure from '../HostProcedure';


const Host = () => {
    // console.log(hostMainImg, '호스트');
    console.log(explanation);
    return (
        <HostStyled>
            <HostMain />
            <p className="infoTitle">Business</p>
            <div className="hostInfo">
                {explanation?.map((x, i) => {
                    return <HostInfo x={x} key={i} />;
                })}
            </div>

            <p className="procedureTitle">개설 과정 안내</p>
            <div className="hostProcedure">
                {procedure?.map((x, i) => {
                    return <HostProcedure x={x} key={i}/>;
                })}
            </div>
            <div className="go">
                <p>Let&apos;s work together!</p>
                <Button className="hostButton">
                    <a href="http://localhost:3001/">호스트 등록하기</a>
                </Button>
            </div>
        </HostStyled>
    );
};
export default Host;
