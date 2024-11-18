import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WishListStyled } from './styled';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Wishlist } from '@/types';
import { message } from 'antd';
import { useRouter } from 'next/router';
interface WishListProps {
  x: Wishlist;
  onRemove: () => void; // 삭제 함수 prop
}
const WishList = ({ x, onRemove }: WishListProps) => {
  if (!x.space || x.space.spaceStatus === 'UNAVAILABLE') {
    return null;
  }
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(true);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지 (상세 페이지로 이동 방지)

    try {
      await onRemove(); // 부모로부터 전달된 삭제 함수 호출
      setIsBookmarked(false); // UI 상태 업데이트
      message.success('찜 목록에서 삭제되었습니다.');
    } catch (error) {
      console.error('위시리스트 삭제 실패:', error);
      message.error('위시리스트 삭제에 실패했습니다.');
    }
  };

  const goToDetailPage = () => {
    // 상세 페이지로 이동
    router.push(`/spacedetail/${x.space?.id}`);
  };

  return (
    <WishListStyled onClick={goToDetailPage}>
      <div className="wish-img">
        <img
          src={x.space?.images?.[0]?.imageUrl || 'Not-Imgafe'}
          alt="Space Image"
        />{' '}
      </div>
      <div className="wish-info">
        <div className="wish-info-top">
          <p>{x.space?.spaceName}</p>
          <div className="wish-icon">
            <FontAwesomeIcon
              icon={faBookmark}
              className={`bookmark-icon ${isBookmarked ? 'active' : ''}`} // 상태에 따라 클래스 설정
              onClick={toggleWishlist}
              style={{ color: isBookmarked ? '#8c73d8' : '#808080' }} // 활성화 시 금색, 비활성화 시 회색
            />
          </div>
        </div>
        <p className="price">
          <span
            style={{
              textDecoration: x.space?.discount ? 'line-through' : 'none',
            }}
          >
            {x.space?.spacePrice.toLocaleString()}원
          </span>
          {(x.space?.discount ?? 0) > 0 && (
            <>
              &nbsp;→&nbsp;
              <span className="discount">
                {(
                  (x.space?.spacePrice ?? 0) - (x.space?.discount ?? 0)
                ).toLocaleString()}
                원
              </span>
            </>
          )}
        </p>
      </div>
    </WishListStyled>
  );
};
export default WishList;
function fetchWishlist() {
  throw new Error('Function not implemented.');
}
