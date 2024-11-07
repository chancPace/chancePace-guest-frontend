import { Button } from 'antd';
import { HostStyled } from './styled';
import { explanation, hostMainImg, procedure } from '@/utill/datas';
import HostImageBox from '@/components/HostImageBox';
import ReactFullpage from '@fullpage/react-fullpage';

const HostPage = () => {
  const text = 'Share Your Space';

  const credits = {
    enabled: false,
    label: '',
    // position: 'left',
  };

  return (
    <HostStyled>
      <ReactFullpage
        credits={credits}
        scrollOverflow={false}
        fitToSection={true}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
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
            </div>
            <div className="section">
              <p className="infoTitle en">Business</p>
              <p className="infoTitle ko">나의 공간을 등록해보세요</p>
              <div className="hostInfo">
                {explanation?.map((x, i) => {
                  return <HostImageBox x={x} key={i} />;
                })}
              </div>
            </div>
            <div className="section">
              <p className="procedureTitle">개설 과정 안내</p>
              <div className="hostProcedure">
                {procedure?.map((x, i) => {
                  return <HostImageBox x={x} key={i} />;
                })}
              </div>
            </div>
            <div className="section">
              <div className="go">
                <p>Let&apos;s work together!</p>
                <div className="host-button">
                  <a href="http://localhost:3001/">호스트 등록하기</a>
                </div>
              </div>
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </HostStyled>
  );
};

export default HostPage;
