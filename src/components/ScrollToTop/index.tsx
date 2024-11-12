import { useEffect, useState } from 'react';
import { ScrollToTopStyled } from './styled';
import { CaretUpOutlined } from '@ant-design/icons';
import kakao from '../../assets/image/kakao.png';
import { Modal, notification } from 'antd';

const ScrollToTop = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 상태

  const handleScroll = () => {
    if (window.scrollY > 1000) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotification = () => {
    notification.info({
      message: '알림',
      description: '준비 중입니다.',
      placement: 'topRight',
      duration: 20,
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
