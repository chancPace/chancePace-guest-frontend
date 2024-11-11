import { useEffect, useState } from 'react';
import { ScrollToTopStyled } from './styled';
import { CaretUpOutlined } from '@ant-design/icons';
import kakao from '../../assets/image/kakao.png';
import { Modal } from 'antd';

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 모달 닫기 함수
  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
    <ScrollToTopStyled>
      <div className="kakao-icon" onClick={showModal}>
        <img src={kakao.src}></img>
      </div>
      <div className="go-top-button" onClick={scrollToTop}>
        <CaretUpOutlined />
        <p>TOP</p>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        cancelText="닫기"
        okText="확인"
      >
        <p>준비 중입니다.</p>
      </Modal>
    </ScrollToTopStyled>
  );
};
export default ScrollToTop;
