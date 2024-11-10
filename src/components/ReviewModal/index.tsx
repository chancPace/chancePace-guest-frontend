import { addReview, updateRatingBySpace } from '@/pages/api/reviewApi';
import { ReviewModalStyled } from './styled';
import { Button, Input, message, Modal, Rate } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Space } from '@/types';
interface ReviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  space?: Space;
  bookingId: number;
  onReviewSubmit: () => void; // 새로운 prop 추가
}
const ReviewModal = ({
  isVisible,
  onClose,
  space,
  bookingId,
  onReviewSubmit,
}: ReviewModalProps) => {
  if (!space) {
    return null; // space가 없을 경우 아무것도 렌더링하지 않음
  }

  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const userToken = useSelector(
    (state: RootState) => state.user.userInfo?.token
  );
  //리뷰전송
  const hadleReviewSubmit = async () => {
    if (!userToken) {
      message.error('로그인이 필요합니다');
      return;
    }
    const reviewData = {
      spaceId: space.id,
      reviewComment,
      reviewRating,
      bookingId,
    };
    try {
      await addReview(reviewData, userToken);
      message.success('리뷰가 성공적으로 등록되었습니다.');
      onReviewSubmit(); // 리뷰 작성 후 부모 컴포넌트로 알림
      setReviewComment('');
      setReviewRating(5);
      onClose();
      await updateRatingBySpace(space?.id);
    } catch (error) {
      console.error('리뷰 등록에 실패했습니다.', error);
    }
  };
  return (
    <Modal
      title="리뷰 작성"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          취소
        </Button>,
        <Button key="submit" type="primary" onClick={hadleReviewSubmit}>
          등록
        </Button>,
      ]}
    >
      <ReviewModalStyled>
        <div className="space-info">
          <div className="space-img"></div>
          <h3 className="space-name">{space?.spaceName}</h3>
        </div>
      </ReviewModalStyled>

      <Input.TextArea
        rows={4}
        value={reviewComment}
        onChange={(e) => setReviewComment(e.target.value)}
        placeholder="리뷰를 작성하세요"
      />
      <div style={{ marginTop: '10px' }}>
        <span>평점: </span>
        <Rate
          value={reviewRating}
          onChange={(value) => setReviewRating(value)}
        />
      </div>
    </Modal>
  );
};

export default ReviewModal;
