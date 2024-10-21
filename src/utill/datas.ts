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

export { hostMainImg, explanation, procedure };
