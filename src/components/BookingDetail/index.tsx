import { MyBookingData } from '@/types';
import { BookingDetailStyled } from './styled';
import { useEffect, useState } from 'react';
import { getOneBooking } from '@/pages/api/bookingApi';
import { message, Modal, Spin, Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Refund } from '@/pages/api/paymentApi';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';

const columns = [
  { dataIndex: 'label', key: 'label' },
  { dataIndex: 'value', key: 'value' },
];

const BookingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  //내 예약 정보 저장
  const [bookingDetails, setBookingDetails] = useState<MyBookingData | null>(
    null
  );
  //취소하기 모달
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  //예약내역 가져오기
  useEffect(() => {
    if (!id) return;
    const fetchBookingDetails = async () => {
      try {
        const data = await getOneBooking(Number(id));
        setBookingDetails(data.data);
      } catch (error) {
        message.error('예약 상세 정보를 불러오는 데 실패했습니다.');
        console.error('데이터 불러오기 실패', error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  //startDate = today 이면 취소하기 버튼 안보이게하기
  const today = new Date();
  const isDisabled = bookingDetails
    ? new Date(bookingDetails.startDate) >= today
    : true;
  const formik = useFormik({
    initialValues: {
      cancelReason: '',
    },
    validate: (values) => {
      const errors: { cancelReason?: string } = {};

      if (!values.cancelReason) {
        errors.cancelReason = '취소사유를 입력해주세요';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true); // 로딩 시작
      try {
        const bookingId = id;
        //예약환불
        await Refund(Number(bookingId), values.cancelReason);
        message.success('예약이 취소되었습니다');
        setIsModalVisible(false);
        router.push('/');
      } catch (error) {
        message.error('예약 취소 실패');
        console.error('예약취소실패', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    },
  });

  const dataSource = [
    {
      key: '1',
      label: '예약 공간',
      value: bookingDetails?.space?.spaceName || '-',
    },
    {
      key: '2',
      label: '예약 위치',
      value: bookingDetails?.space?.spaceLocation || '-',
    },
    {
      key: '3',
      label: '결제일',
      value: bookingDetails?.createdAt
        ? new Date(bookingDetails.createdAt).toLocaleDateString('en-CA')
        : '-',
    },
    {
      key: '4',
      label: '예약 날짜',
      value: bookingDetails?.startDate || '-',
    },
    {
      key: '5',
      label: '이용 시간',
      value: `${bookingDetails?.startTime}:00 - ${bookingDetails?.endTime}:00`,
    },
    {
      key: '6',
      label: '결제 방식',
      value: bookingDetails?.payment?.paymentMethod || '-',
    },
    {
      key: '7',
      label: '카드 번호',
      value:
        bookingDetails?.payment?.cardNumber === 'UNKNOWN' ||
        !bookingDetails?.payment?.cardNumber
          ? '-'
          : bookingDetails?.payment?.cardNumber,
    },
    {
      key: '8',
      label: '결제 금액',
      value:
        bookingDetails?.payment?.paymentPrice?.toLocaleString() + '원' || '-',
    },
    {
      key: '9',
      label: '쿠폰 할인',
      value: bookingDetails?.payment?.couponPrice
        ? `${bookingDetails?.payment.couponPrice.toLocaleString()}원`
        : '-',
    },
    ...(bookingDetails?.bookingStatus === 'CANCELLED'
      ? [
          {
            key: '10',
            label: '환불 금액',
            value:
              bookingDetails?.payment?.paymentStatus === 'REFUNDED'
                ? `${bookingDetails.payment.paymentPrice.toLocaleString()}원`
                : '-',
          },
          {
            key: '11',
            label: '취소 일시',
            value: new Date(bookingDetails.updatedAt).toLocaleDateString(
              'en-CA'
            ),
          },
        ]
      : []),
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 모달 닫기 함수
  const handleCancel = () => {
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
              pagination={false}
              bordered
              showHeader={false}
            />
          </div>
        </div>
      )}
      <div className="button-box">
        {bookingDetails?.bookingStatus !== 'CANCELLED' && !isDisabled && (
          <button onClick={showModal}>취소하기</button>
        )}
        <Link href="/" passHref>
          <button>메인으로</button>
        </Link>{' '}
      </div>
      <Modal
        title="안내"
        visible={isModalVisible}
        onOk={() => formik.handleSubmit()}
        onCancel={handleCancel}
        cancelText="닫기"
        okText={isLoading ? <Spin size="small" /> : '확인'}
        okButtonProps={{ disabled: isLoading }}
      >
        <p>결제를 취소하시겠습니까?</p>
        <TextArea
          name="cancelReason"
          placeholder="취소 사유를 입력해주세요"
          rows={4}
          value={formik.values.cancelReason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.cancelReason && formik.touched.cancelReason && (
          <div className="error">{formik.errors.cancelReason}</div>
        )}
      </Modal>
    </BookingDetailStyled>
  );
};
export default BookingDetail;
