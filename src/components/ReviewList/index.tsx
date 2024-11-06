import { GetReviewData } from '@/types';
import { ReviewListStyled } from './styled';
import { Rate } from 'antd';

interface ReviewListProps {
  x: GetReviewData;
}

const ReviewList = ({ x }: ReviewListProps) => {
  console.log(x, 'x');
  const formattedDate = new Date(x.createdAt).toLocaleDateString('en-CA'); // "en-CA" 포맷으로 "yyyy-mm-dd" 형식 출력

  return (
    <ReviewListStyled>
      <div className='space-name'>
        {x.Space?.spaceName}
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
