import { GetReviewData } from '@/types';
import { ReviewListStyled } from './styled';
import { message, Modal, Rate } from 'antd';
import { updateReview } from '@/pages/api/reviewApi';
const { confirm } = Modal;

interface ReviewListProps {
  x: GetReviewData;
  fetchUserData?: () => void; // 함수 props로 받아오기
  isDeletable?: boolean; // 삭제 버튼을 렌더링할지 여부
}

const ReviewList = ({ x, fetchUserData, isDeletable }: ReviewListProps) => {
  const formattedDate = new Date(x.createdAt).toLocaleDateString('en-CA');

  const handleDeleteClick = async (reviewId: number) => {
    const reviewData = {
      reviewComment: x.reviewComment,
      reviewRating: null,
      reviewStatus: 'UNAVAILABLE',
    };
    try {
      const result = await updateReview(reviewId, reviewData);
      if (result) {
        message.success('리뷰가 성공적으로 삭제되었습니다.');
        if (fetchUserData) {
          fetchUserData(); // fetchUserData가 정의된 경우에만 호출
        }
      }
    } catch (error) {
      message.error('리뷰 삭제에 실패했습니다.');
    }
  };

  const showDeleteConfirm = (reviewId: number) => {
    confirm({
      title: '리뷰를 삭제하시겠습니까?',
      content: '한 번 삭제된 리뷰는 되돌릴 수 없습니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        handleDeleteClick(reviewId); // 확인 버튼 클릭 시 삭제 로직 실행
      },
      onCancel() {
        console.log('삭제 취소');
      },
    });
  };

  return (
    <ReviewListStyled>
      <div className="top">
        <p>{x.Space?.spaceName}</p>
        {isDeletable && (
          <p className="delete" onClick={() => showDeleteConfirm(x.id)}>
            삭제하기
          </p>
        )}
      </div>
      <div className="rating">
        <Rate disabled defaultValue={x.reviewRating} />
        <p className="date">{formattedDate}</p>
      </div>
      <div className="bottom">
        {x.User?.email && <p>작성자: {x.User.email}</p>}
      </div>
      {x.reviewComment}
    </ReviewListStyled>
  );
};
export default ReviewList;
