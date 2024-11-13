import { FooterStyled } from './styled';
import { CiLocationOn } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';

import { CiHeadphones } from 'react-icons/ci';

const Footer = () => {
  if (window.location.pathname === '/login') return null;
  if (window.location.pathname === '/signup') return null;

  return (
    <FooterStyled>
      <div className="footer1">
        <p>이용약관</p>
        <p>개인정보처리방침</p>
        <p>정산 및 환불정책</p>
        <p>공간 관리 정책</p>
      </div>
      <div className="footer2">
        <div>
          <CiLocationOn />
          <p>서울특별시 마포구 도화2길 53</p>
        </div>
        <div>
          <CiHeadphones />
          <p>02-0000-0000</p>
        </div>
        <div>
          <CiMail />
          <p>chancpace@chancepace-official.com</p>
        </div>
        <div>
          <CiTimer />
          <p>월-금 09:00 - 18:00</p>
        </div>
      </div>
      <div className="footer3">
        <p>주식회사 찬스페이스</p>
        <p>대표: 윤석찬</p>
        <p>사업자등록번호: 000-00-00000</p>
        <p>통신판매업신고번호: 2024-서울마포구-0000</p>
      </div>
      <div className="footer4">
        <p>Copyright ⓒ2024 chancepace All rights reserved. </p>
      </div>
    </FooterStyled>
  );
};

export default Footer;
