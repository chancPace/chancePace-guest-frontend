import { text } from 'stream/consumers';
import s1 from '../assets/image/space1.jpg';
import s2 from '../assets/image/space2.jpg';
import s3 from '../assets/image/space3.jpg';
import s4 from '../assets/image/space4.jpg';
import s5 from '../assets/image/space5.jpg';
import s6 from '../assets/image/space6.jpg';
import icon1 from '../assets/image/icon1.jpg';
import icon2 from '../assets/image/icon2.jpg';
import icon3 from '../assets/image/icon3.jpg';
import s1_1 from '../assets/image/s1-1.jpg'
import s1_2 from '../assets/image/s1-2.jpg'
import s1_3 from '../assets/image/s1-3.jpg'

const hostMainImg = [s1, s2, s3, s4, s5, s6];

const explanation = [
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

const procedure = [
    {
        title: '01 공간등록',
        text: '호스트등록하기 버튼을 클릭해 호스트센터로 이동하여 공간 등록',
    },
    {
        title: '02 관리자 선정',
        text: '관리자 확인 후 승인 및 반려 절차',
    },
    {

        title: '03 승인',
        text: '공간 쉐어 시작!',
    },
];

const space = [
    {
        spaceName: '아늑한 회의실',
        spaceLocation: '서울, 대한민국',
        description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
        spacePrice: 100000,
        discount: 10000,
        amenities: ['WiFi, 화이트보드, 프로젝터'],
        cleanTime: 30,
        spaceStatus: 'AVAILABLE',
        isOpen: true,
        caution:['대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.','- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.'], //주의사항
        category: '파티룸', //카테고리
        Minimum: 3, //최소인원
        Maximum: 6, //최대인원
        spaceImg: [], //공간사진
    },
    {
        spaceName: '아늑한 회의실',
        spaceLocation: '서울, 대한민국',
        description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
        spacePrice: 100000,
        discount: 10000,
        amenities: ['WiFi, 화이트보드, 프로젝터'],
        cleanTime: 30,
        spaceStatus: 'AVAILABLE',
        isOpen: true,
        caution:['대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.','- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.'], //주의사항
        category: '파티룸', //카테고리
        Minimum: 3, //최소인원
        Maximum: 6, //최대인원
        spaceImg: [], //공간사진
    },
    {
        spaceName: '아늑한 회의실',
        spaceLocation: '서울, 대한민국',
        description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
        spacePrice: 100000,
        discount: 10000,
        amenities: ['WiFi, 화이트보드, 프로젝터'],
        cleanTime: 30,
        spaceStatus: 'AVAILABLE',
        isOpen: true,
        caution:['대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.','- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.'], //주의사항
        category: '파티룸', //카테고리
        Minimum: 3, //최소인원
        Maximum: 6, //최대인원
        spaceImg: [], //공간사진
    },
    {
        spaceName: '아늑한 회의실',
        spaceLocation: '서울, 대한민국',
        description: '회의에 필요한 모든 편의 시설을 갖춘 편안한 공간입니다.',
        spacePrice: 100000,
        discount: 10000,
        amenities: ['WiFi, 화이트보드, 프로젝터'],
        cleanTime: 30,
        spaceStatus: 'AVAILABLE',
        isOpen: true,
        caution:['대여 시간보다 적게 사용 하더라도 대관비는 환불되지 않습니다.','- 기물 파손 및 청소 등의 사유로 보증금을 호스트에게 입금하여야 합니다.'], //주의사항
        category: '파티룸', //카테고리
        Minimum: 3, //최소인원
        Maximum: 6, //최대인원
        spaceImg: [s1_1,s1_2,s1_3], //공간사진
    },
];


export { hostMainImg, explanation, procedure, space };
