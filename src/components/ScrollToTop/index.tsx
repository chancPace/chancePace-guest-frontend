import { ScrollToTopStyled } from './styled';
import { CaretUpOutlined } from '@ant-design/icons';
import kakao from '../../assets/image/kakao.jpg';
import { notification } from 'antd';

const ScrollToTop = () => {
  if (window.location.pathname === '/host') return null;
  if (window.location.pathname === '/login') return null;
  if (window.location.pathname === '/signup') return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <ScrollToTopStyled>
      <div className="kakao-icon">
        <a href="kakaoopen://join?l=sYLZ1JZg&r=EW%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fkakaoopen://join?l=sYLZ1JZg&r=EW%3Ahttp%3A%2F%2Flocalhost%3A3000%2F">
          <img src={kakao.src}></img>
        </a>
      </div>
      <div className="go-top-button" onClick={scrollToTop}>
        <CaretUpOutlined />
        <p>TOP</p>
      </div>
    </ScrollToTopStyled>
  );
};
export default ScrollToTop;
