import { HostStyled } from './styled';
import { explanation, hostMainImg, procedure } from '@/utill/datas';
import HostImageBox from '@/components/HostImageBox';
import ReactFullpage from '@fullpage/react-fullpage';
import { useEffect, useState } from 'react';

const HostPage = () => {
  const text = 'Share Your Space';
  const [displayedText, setDisplayedText] = useState('');

  //글자 한개씩 나타내기
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex++;
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  const credits = {
    enabled: false,
    label: '',
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
                  {hostMainImg?.map((x, i) => (
                    <img key={i} src={x.src} alt={x.src} />
                  ))}
                </div>
                <p className="mainTitle">{displayedText}</p>
              </div>
            </div>
            <div className="section">
              <div className="explanation">
                <p className="infoTitle en">Business</p>
                <p className="infoTitle ko">나의 공간을 등록해보세요</p>
                <div className="hostInfo">
                  {explanation?.map((x, i) => (
                    <HostImageBox x={x} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="procedure-list">
                <p className="procedureMainTitle">개설 과정 안내</p>
                <div className="hostProcedure">
                  {procedure?.map((x, i) => (
                    <HostImageBox x={x} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="together">
                <div className="go">
                  <p>Let&apos;s work together!</p>
                  <div className="host-button">
                    <a href="http://localhost:3001/">호스트 등록하기</a>
                  </div>
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
