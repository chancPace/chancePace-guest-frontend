import { ScrollToTopStyled } from './styled';
import { CaretUpOutlined } from '@ant-design/icons';
import kakao from '../../assets/image/kakao.png';
import { notification } from 'antd';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotification = () => {
    notification.info({
      message: '알림',
      description: '준비 중입니다.',
      placement: 'topRight',
      duration: 1,
    });
  };

  return (
    <ScrollToTopStyled>
      <div className="kakao-icon" onClick={showNotification}>
        <img src={kakao.src}></img>
      </div>
      <div className="go-top-button" onClick={scrollToTop}>
        <CaretUpOutlined />
        <p>TOP</p>
      </div>
    </ScrollToTopStyled>
  );
};
export default ScrollToTop;
