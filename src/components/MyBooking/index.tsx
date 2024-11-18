import { MyBookingData } from '@/types';
import { MyBookingStyled } from './styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReviewModal from '../ReviewModal';
interface MyBookingProps {
  x: MyBookingData;
}
const MyBooking = ({ x }: MyBookingProps) => {
  if (x.space?.spaceStatus === 'UNAVAILABLE') {
    return null;
  }
  const router = useRouter();
  //리뷰쓰기 버튼 보여주기 상태
  const [isReviewBtnVisible, setIsReviewBtnVisible] = useState(false);
  //모달 창 보여주시 상태
  const [isModalVisible, setIsModalVisible] = useState(false);

  //이용상태
  const [bookingStatusText, setBookingStatusText] = useState<string>('이용전'); // 상태 텍스트

  //이용일이 오늘 이후일 경우에 이용완료로 간주하여 리뷰쓰기 버튼 보여주기
  useEffect(() => {
    const today = new Date();
    const bookingDate = new Date(x.startDate);
    //오늘인지?
    const isToday = bookingDate.toDateString() === today.toDateString();
    //예약시간이 지났는지?
    const isEnd = x.endTime <= today.getHours();

    if (x.bookingStatus === 'CANCELLED') {
      setBookingStatusText('예약 취소');
      setIsModalVisible(false);
    } else if (isToday) {
      if (isEnd) {
        setBookingStatusText('이용완료');
        setIsReviewBtnVisible(!x.review);
      } else {
        setBookingStatusText('이용전');
        setIsReviewBtnVisible(false);
      }
    } else if (bookingDate < today) {
      setBookingStatusText('이용완료');
      setIsReviewBtnVisible(!x.review);
    } else {
      setBookingStatusText('이용전');
      setIsReviewBtnVisible(false);
    }
  }, [x.startDate, x.endTime, x.review]);

  //예약내역 정보 클릭하면 해당 공간의 상세페이지로 이동
  const handleClick = () => {
    if (x.space?.id) {
      router.push(`/spacedetail/${x.space.id}`);
    }
  };

  //리뷰쓰기 모달 창 보여주기 여부 설정
  const openReviewModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  //모달 창 닫았을때
  const closeReviewModal = () => {
    setIsModalVisible(false);
  };

  //리뷰 등록 후 버튼 숨기기
  const handleReviewSubmit = () => {
    setIsReviewBtnVisible(false);
  };

  //상세보기 클릭 시 예약 상세내역 확인
  const handleDetailsClick = () => {
    router.push(`/bookingdetail/${x.id}`); // 예약 상세 페이지로 이동
  };

  return (
    <MyBookingStyled>
      <div className="booking-date">
        <p>{x.startDate}</p>
        <span onClick={handleDetailsClick} className="view-button">
          상세보기
        </span>
      </div>
      <div className="booking-data" onClick={handleClick}>
        <div className="booking-space-img">
          <img src={x.space?.images[0].imageUrl} />
        </div>
        <div className="booking-info">
          <div className="booking-space-name">{x.space?.spaceName}</div>
          <div className="booking-time">
            <span>이용시간</span> {x.startTime}:00 - {x.endTime}:00 (
            {x.endTime - x.startTime}시간)
          </div>
          <div className="booking-status">{bookingStatusText}</div>{' '}
        </div>
        {isReviewBtnVisible && (
          <div className="review-btn-box">
            <div className="review-btn" onClick={openReviewModal}>
              리뷰쓰기
            </div>
          </div>
        )}
      </div>
      <ReviewModal
        isVisible={isModalVisible}
        onClose={closeReviewModal}
        space={x.space}
        bookingId={x.id}
        onReviewSubmit={handleReviewSubmit}
      />
    </MyBookingStyled>
  );
};
export default MyBooking;
