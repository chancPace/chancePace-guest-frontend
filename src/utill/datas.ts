import s1 from '../assets/image/space1.jpg';
import s2 from '../assets/image/space2.jpg';
import s3 from '../assets/image/space3.jpg';
import s4 from '../assets/image/space4.jpg';
import s5 from '../assets/image/space5.jpg';
import s6 from '../assets/image/space6.jpg';
import icon1 from '../assets/image/icon1.jpg';
import icon2 from '../assets/image/icon2.jpg';
import icon3 from '../assets/image/icon3.jpg';
import login from '@/assets/image/feed.svg';
import house from '@/assets/image/house.svg';
import allow from '@/assets/image/party-popper.svg';
import banner1 from '../assets/image/banner1.png';
import banner2 from '../assets/image/banner2.jpeg';
import banner3 from '../assets/image/banner3.jpeg';
import banner4 from '../assets/image/banner4.jpeg';

import { HostMainImg, Explanation, Procedure } from '@/types';

const hostMainImg: HostMainImg[] = [s1, s2, s3, s4, s5, s6];

const explanation: Explanation[] = [
  {
    img: icon1,
    title: '쉽고 빠른 예약관리',
    text: '누구나 쉽게 공간을 등록하고 예약과 정산을 관리할 수 있습니다',
  },
  {
    img: icon2,
    title: '맞춤형 홍보 지원 및 노출강화',
    text: '블로그, 인스타그램 등 sns채널을 통해 호스트님의 공간을 홍보해드립니다',
  },
  {
    img: icon3,
    title: '전담 고객지원으로 빠른 문제 해결',
    text: '공간운영, 광고상품 관리를 전담하는 호스트 케어팀이 서포트 합니다',
  },
];

const procedure: Procedure[] = [
  {
    index: '01',
    img: login,
    title: '회원가입 및 로그인',
    text: '호스트등록하기 버튼을 클릭해 호스트센터로 이동하여 공간 등록을 시작합니다. 회원가입 후 로그인하여 개인 정보를 입력하세요.',
  },
  {
    index: '02',
    img: house,
    title: '공간등록',
    text: '공간 등록 양식을 작성합니다. 공간의 종류, 위치, 가격, 편의시설 등의 정보를 상세히 입력하여 잠재 고객에게 매력적으로 보이도록 합니다.',
  },
  {
    index: '03',
    img: login,
    title: '관리자 선정',
    text: '관리자 확인 후 승인 및 반려 절차가 진행됩니다. 등록된 정보는 관리자에 의해 검토되며, 필요한 경우 추가 정보 요청이 있을 수 있습니다. 모든 정보를 정확하게 입력하는 것이 중요합니다.',
  },
  {
    index: '04',
    img: allow,
    title: '승인',
    text: '승인을 받으면 귀하의 공간이 플랫폼에 등록됩니다. 이제 고객이 귀하의 공간을 예약할 수 있으며, 예약 관리와 고객 소통을 통해 좋은 서비스를 제공하세요.',
  },
];

const banner = [
  {
    img: banner1.src,
    link: '/signup',
  },
  {
    img: banner2.src,
    link: 'https://www.yeogi.com/event/4090/%EC%97%AC%ED%96%89%EB%B6%80%EC%BA%90%20%ED%85%8C%EC%8A%A4%ED%8A%B8/https%3A%2F%2Fapi3.goodchoice.kr%2Fevent3%2Fweb%2FadEventView%3Faevno%3D4090',
  },
  {
    img: banner3.src,
    link: 'https://www.yeogi.com/event/4224/%EC%97%AC%EA%B8%B0%EC%96%B4%EB%95%8C%20%ED%88%AC%EC%96%B4/https%3A%2F%2Fapi3.goodchoice.kr%2Fevent3%2Fweb%2FadEventView%3Faevno%3D4224',
  },
  {
    img: banner4.src,
    link: 'https://www.yeogi.com/event/4344/%ED%95%B4%EC%99%B8%20%EA%B2%A8%EC%9A%B8%ED%9C%B4%EA%B0%80%20%EC%BF%A0%ED%8F%B0%ED%8C%A9/https%3A%2F%2Fapi3.goodchoice.kr%2Fevent3%2Fweb%2FadEventView%3Faevno%3D4344',
  },
];

export { hostMainImg, explanation, procedure, banner };
