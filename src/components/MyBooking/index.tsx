import { MyBookingData } from '@/types';
import { MyBookingStyled } from './styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReviewModal from '../ReviewModal';
interface MyBookingProps {
  x: MyBookingData;
}
const MyBooking = ({ x }: MyBookingProps) => {
  const router = useRouter();
  //리뷰쓰기 버튼 보여주기 상태
  const [isReviewBtnVisible, setIsReviewBtnVisible] = useState(false);
  //모달 창 보여주시 상태
  const [isModalVisible, setIsModalVisible] = useState(false);

  //이용일이 오늘 이후일 경우에 이용완료로 간주하여 리뷰쓰기 버튼 보여주기
  useEffect(() => {
    const today = new Date().toDateString(); // 시간 제외한 오늘 날짜 문자열
    const bookingDate = new Date(x.startDate).toDateString(); // 시간 제외한 예약 날짜 문자열
    setIsReviewBtnVisible(today <= bookingDate);
  }, [x.startDate]);

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

  return (
    <MyBookingStyled>
      <div className="booking-date">
        <p>{x.startDate}</p>
        <p>상세보기</p>
      </div>
      <div className="booking-data" onClick={handleClick}>
        <div className="booking-space-img"></div>
        <div className="booking-info">
          <div className="booking-space-name">{x.space?.spaceName}</div>
          <div className="booking-time">
            이용시간: {x.startTime}:00 - {x.endTime}:00 (
            {x.endTime - x.startTime}시간)
          </div>
          <div className="booking-person">최대인원: {x.space?.maxGuests}</div>
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
        onReviewSubmit={handleReviewSubmit} // 리뷰 등록 후 버튼 숨김 처리
      />
    </MyBookingStyled>
  );
};
export default MyBooking;
