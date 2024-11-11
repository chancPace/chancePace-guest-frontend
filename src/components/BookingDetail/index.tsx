import { MyBookingData } from '@/types';
import { BookingDetailStyled } from './styled';
import { useEffect, useState } from 'react';
import { getOneBooking } from '@/pages/api/bookingApi';
import { message, Modal, Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const columns = [
  { dataIndex: 'label', key: 'label' },
  { dataIndex: 'value', key: 'value' },
];

const BookingDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [bookingDetails, setBookingDetails] = useState<MyBookingData | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 상태

  useEffect(() => {
    if (!id) return;

    const fetchBookingDetails = async () => {
      try {
        const data = await getOneBooking(Number(id)); // id를 숫자로 변환하여 사용
        setBookingDetails(data.data);
      } catch (error) {
        message.error('예약 상세 정보를 불러오는 데 실패했습니다.');
        console.error('데이터 불러오기 실패', error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const dataSource = bookingDetails
    ? [
        {
          key: '1',
          label: '예약 공간',
          value: bookingDetails.space?.spaceName || '-',
        },
        {
          key: '2',
          label: '예약 위치',
          value: bookingDetails.space?.spaceLocation || '-',
        },
        {
          key: '3',
          label: '예약 날짜',
          value: bookingDetails.startDate || '-',
        },
        {
          key: '4',
          label: '이용 시간',
          value: `${bookingDetails.startTime}:00 - ${bookingDetails.endTime}:00`,
        },
        {
          key: '5',
          label: '결제 방식',
          value: bookingDetails.payment?.paymentMethod || '-',
        },
        {
          key: '6',
          label: '카드 번호',
          value: bookingDetails.payment?.cardNumber || '-',
        },
        {
          key: '7',
          label: '결제 금액',
          value:
            bookingDetails.payment?.paymentPrice?.toLocaleString() + '원' ||
            '-',
        },
        {
          key: '8',
          label: '쿠폰 할인',
          value: bookingDetails.payment?.couponPrice
            ? `${bookingDetails.payment.couponPrice}원`
            : '-',
        },
      ]
    : [];

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 모달 닫기 함수
  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <BookingDetailStyled>
      {bookingDetails && (
        <div className="booking-detail">
          <h1>나의 예약 정보</h1>
          <div className="text">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false} // 페이지네이션 제거
              bordered
              showHeader={false} // 헤더 숨기기
            />
          </div>
        </div>
      )}
      <div className="button-box">
        <button onClick={showModal}>취소하기</button>
        <Link href="/" passHref>
          <button>메인으로</button>
        </Link>{' '}
      </div>
      <Modal
        title="안내"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        cancelText="닫기"
        okText="확인"
      >
        <p>준비 중입니다.</p>
      </Modal>
    </BookingDetailStyled>
  );
};
export default BookingDetail;
