import { GetReviewData } from '@/types';
import { ReviewListStyled } from './styled';
import { message, Modal, Rate } from 'antd';
import { updateRatingBySpace, updateReview } from '@/pages/api/reviewApi';
const { confirm } = Modal;

interface ReviewListProps {
  x: GetReviewData;
  fetchUserData?: () => void;
  // 삭제 버튼을 렌더링할지 여부
  isDeletable?: boolean;
}

const ReviewList = ({ x, fetchUserData, isDeletable }: ReviewListProps) => {
  console.log(x, 'xxxx');
  if (x.space?.spaceStatus === 'UNAVAILABLE') {
    return null;
  }
  //작성일자 형식 바꾸기
  const formattedDate = new Date(x.createdAt).toLocaleDateString('en-CA');
  const spaceId = Number(x.space?.id);

  //리뷰 삭제

  const handleDeleteClick = async (reviewId: number) => {
    const reviewData = {
      spaceId,
      reviewComment: x.reviewComment,
      reviewRating: null,
      reviewStatus: 'UNAVAILABLE',
    };
    try {
      const result = await updateReview(reviewId, reviewData);
      if (result) {
        message.success('리뷰가 성공적으로 삭제되었습니다.');
        //삭제완료되면 평점 계산 실행
        const updateResult = await updateRatingBySpace(spaceId);
        if (updateResult && fetchUserData) {
          fetchUserData();
        }
      }
    } catch (error) {
      message.error('리뷰 삭제에 실패했습니다.');
    }
  };

  //삭제하기 버튼 눌렀을때 삭제 확인 모달 띄우기
  const showDeleteConfirm = (reviewId: number) => {
    confirm({
      title: '리뷰를 삭제하시겠습니까?',
      content: '한 번 삭제된 리뷰는 복구할 수 없으며, 재작성이 불가능합니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        handleDeleteClick(reviewId); // 확인 버튼 클릭 시 삭제 로직 실행
      },
      onCancel() {
        // console.log('삭제 취소');
      },
    });
  };

  return (
    <ReviewListStyled>
      <div className="top">
        <div className="top-left">
          {x.space?.images && x.space.images.length > 0 ? (
            <img
              src={x.space.images[0].imageUrl}
              className="wish-img"
              alt="Space Image"
            />
          ) : (
            <p>Non-Image</p>
          )}
          <div className="rating">
            <p>{x.space?.spaceName}</p>
            <Rate disabled defaultValue={x.reviewRating} />
            <p className="date">작성일자: {formattedDate}</p>
          </div>
        </div>

        <div className="top-right">
          {isDeletable && (
            <p className="delete" onClick={() => showDeleteConfirm(x.id)}>
              삭제
            </p>
          )}
        </div>
      </div>

      <div className="bottom">
        {x.user?.email && <p>{x.user.email}</p>}
        <p> {x.reviewComment}</p>
      </div>
    </ReviewListStyled>
  );
};
export default ReviewList;
