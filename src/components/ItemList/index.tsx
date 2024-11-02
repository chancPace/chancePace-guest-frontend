import { useRouter } from 'next/router';
import { ItemListStyled } from './styled';
import { Space } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // 아이콘 임포트
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { getReviewBySpace } from '@/pages/api/reviewApi';

interface ItemListProps {
  x: Space;
}
const ItemList = ({ x }: ItemListProps) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reviewCount, setReviewCount] = useState<number>(0);
  // console.log(reviewCount,'리뷰카운트')
  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const reviews = await getReviewBySpace(x.id);
        // console.log(reviews, '리뷰즈');
        setReviewCount(reviews.data.length); // 리뷰 배열의 길이를 개수로 설정
        // console.log(reviewCount, '리뷰카운트');
      
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviewCount();
  }, []);

  const handleClick = () => {
    router.push(`/spacedetail/${x.id}`);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <ItemListStyled onClick={handleClick}>
      {/* <div className="itemImg">
        <img src={x.spaceImg[0].src} alt={x.spaceName} className="img"></img>
      </div> */}
      <div className="item-bottom">
        <div className="itemText">
          <p>{x.spaceName}</p>
          <p>{x.spaceLocation}</p>
          <p>{x.spacePrice.toLocaleString()}원 / 시간</p>
          <div className="rate">
            <FaStar style={{ color: '#FEC01F' }} />
            <p className="rate-number">{x.spaceRating}({reviewCount})</p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faBookmark}
          className={`bookmark-icon ${isBookmarked ? 'active' : ''}`}
          onClick={toggleBookmark}
        />
      </div>
    </ItemListStyled>
  );
};
export default ItemList;
