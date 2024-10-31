import s1 from '../assets/image/space1.jpg';
import s2 from '../assets/image/space2.jpg';
import s3 from '../assets/image/space3.jpg';
import s4 from '../assets/image/space4.jpg';
import s5 from '../assets/image/space5.jpg';
import s6 from '../assets/image/space6.jpg';
import icon1 from '../assets/image/icon1.jpg';
import icon2 from '../assets/image/icon2.jpg';
import icon3 from '../assets/image/icon3.jpg';
import s1_1 from '../assets/image/s1-1.jpg';
import s1_2 from '../assets/image/s1-2.jpg';
import s1_3 from '../assets/image/s1-3.jpg';
import s1_4 from '../assets/image/s1-4.jpg';
import s1_5 from '../assets/image/s1-5.jpg';
import s1_6 from '../assets/image/s1-6.jpg';
import login from '@/assets/image/feed.svg';
import house from '@/assets/image/house.svg';
import allow from '@/assets/image/party-popper.svg';
import { HostMainImg, Explanation, Procedure, Space } from '@/types';

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

const space: Space[] = [
  {
    id: 1,
    spaceName: '별의순간 홍대1분',
    spaceLocation: '서울시 서초구 잠원동 164',
    description: '반짝이는 순간을 위한 모임공간, 별의순간',
    spacePrice: 100000,
    discount: 10000,
    amenities: [
      '책상,의자,TV,소파,칠판 등 모든 가구가 이동식으로 설계되어 모임의 성격에 맞게 변형이 가능',
      '삼성 스마트TV 모니터, 모듈 소파/ 책상 및 의자, 얼음정수기, 공기청정기,블루투스 스피커, 이동식 칠판, 노트북 ,행거,보조의자2개',
      '[내부시설]내부 단독 화장실, 별도 손세정용 세면대,',
      '[주차] 1시간 무료, 초과시 시간당 3000원',
    ],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_4, s1_1, s1_5, s1_2, s1_3, s1_1, s1_2], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 2,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_5, s1_1, s1_4, s1_2, s1_3, s1_5, s1_6, s1_1], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 3,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_6, s1_4, s1_5, s1_2, s1_3], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 4,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_4, s1_1, s1_5, s1_2, s1_3], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 5,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_5, s1_1, s1_4, s1_2, s1_3], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 6,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_6, s1_1, s1_4, s1_2, s1_3], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 7,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_4, s1_1, s1_5, s1_2, s1_3], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
  {
    id: 8,
    spaceName: '아늑한 회의실',
    spaceLocation: '서울, 대한민국',
    description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
    spacePrice: 100000,
    discount: 10000,
    amenities: ['WiFi, 화이트보드, 프로젝터'],
    cleanTime: 30,
    spaceStatus: 'AVAILABLE',
    isOpen: true,
    caution: [
      '대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.',
      '- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.',
    ], //주의사항
    category: {
      mainCategory: '모임공간',
      subCategory: '소규모 회의실',
    },
    Minimum: 3, //최소인원
    Maximum: 6, //최대인원
    spaceImg: [s1_5, s1_1, s1_4, s1_2, s1_3], //공간사진
    businessStartTime: 4,
    businessEndTime: 20,
    addPrice: 5000,
  },
];

export { hostMainImg, explanation, procedure, space };
