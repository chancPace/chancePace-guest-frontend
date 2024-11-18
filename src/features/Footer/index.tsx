import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FooterStyled } from './styled';
import { CiLocationOn } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';

import { CiHeadphones } from 'react-icons/ci';
import {
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  if (window.location.pathname === '/login') return null;
  if (window.location.pathname === '/signup') return null;

  return (
    <FooterStyled>
      <div className="footer-sns">
        <a href="https://www.instagram.com/sem/campaign/emailsignup/?campaign_id=13530338586&extra_1=s%7Cc%7C547419126422%7Ce%7Cinstagram%20%27%7C&placement=&creative=547419126422&keyword=instagram%20%27&partner_id=googlesem&extra_2=campaignid%3D13530338586%26adgroupid%3D126262418054%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-1321618851291%26loc_physical_ms%3D9195692%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gad_source=1&gclid=Cj0KCQiAouG5BhDBARIsAOc08RRLSPTzyrw-8ffrx9l5HUDpyb9OeDmGV6Ql_V0R5_QL8XzwybQVIJwaAqkWEALw_wcB">
          <p>
            <FontAwesomeIcon icon={faInstagram} />
          </p>
        </a>
        <a href="https://x.com/?lang=ko">
          <p>
            <FontAwesomeIcon icon={faTwitter} />
          </p>
        </a>
        <a href="https://www.youtube.com/?hl=ko&gl=KR&app=desktop">
          <p>
            <FontAwesomeIcon icon={faYoutube} />
          </p>
        </a>
      </div>
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
