import { Button } from 'antd';
import { HostStyled } from './styled';
import { explanation, hostMainImg, procedure } from '@/utill/datas';
import HostImageBox from '@/components/HostImageBox';

const HostPage = () => {
  // console.log(hostMainImg, '호스트');
  console.log(explanation);
  const text = 'Share Your Space';
  return (
    <HostStyled>
      <div className="hostMain">
        <div className="mainImg">
          {hostMainImg?.map((x, i) => {
            return <img key={i} src={x.src} alt={x.src}></img>;
          })}
          <p className="mainTitle">
            {text.split('').map((char, index) => (
              <span
                key={index}
                style={{ '--i': index } as React.CSSProperties} // CSSProperties로 명시
              >
                {char}
              </span>
            ))}
          </p>
        </div>
      </div>
      <p className="infoTitle">Business</p>
      <div className="hostInfo">
        {explanation?.map((x, i) => {
          return <HostImageBox x={x} key={i} />;
        })}
      </div>

      <p className="procedureTitle">개설 과정 안내</p>
      <div className="hostProcedure">
        {procedure?.map((x, i) => {
          return <HostImageBox x={x} key={i} />;
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
export default HostPage;
