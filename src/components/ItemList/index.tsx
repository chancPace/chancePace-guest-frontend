import { useRouter } from 'next/router';
import { ItemListStyled } from './styled';
import { Space, Wishlist } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { getReviewBySpace } from '@/pages/api/reviewApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { message } from 'antd';
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from '@/pages/api/wishlistApi';

interface ItemListProps {
  x: Space;
}
const ItemList = ({ x }: ItemListProps) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const userId = useSelector((state: RootState) => state.user.userInfo?.id);


  //해당 공간의 리뷰 갯수 가져오기
  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const reviews = await getReviewBySpace(x.id);
        setReviewCount(reviews.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviewCount();
  }, [x.id]);

  //찜 목록 불러오기
  const fetchWishlist = async () => {
    if (userId) {
      try {
        const response = await getWishlist(userId);
        setWishlist(response.data);
        const isWishlisted = response.data.some(
          (item: Wishlist) => item.spaceId === x.id
        );
        setIsBookmarked(isWishlisted);
      } catch (error) {
        console.error('찜 목록 불러오기 실패', error);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId, x.id]);

  //찜 아이콘 클릭함수
  //클릭한 아이템이 찜에 포함되어있으면 삭제 없으면 추가
  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 찜 아이콘 클릭 시 상세 페이지로 넘어가지 않도록 이벤트 전파 방지

    if (!userId) {
      alert('로그인이 필요합니다');
      router.push('/login');
      return;
    }
    try {
      const wishItem = wishlist.find((item) => item.spaceId === x.id);
      if (wishItem) {
        await removeWishlist(wishItem.id);
        message.success(`찜 목록에서 삭제되었습니다.`);
      } else {
        await addWishlist(userId, x.id);
        message.success(`찜 목록에 추가되었습니다.`);
      }

      // API 호출 후 최신 wishlist 가져오기
      await fetchWishlist();
    } catch (error) {
      console.error('위시리스트 토글 실패', error);
    }
  };

  //상품 목록 클릭시 디테일 페이지 이동
  const handleClick = () => {
    router.push(`/spacedetail/${x.id}`);
  };

  return (
    <ItemListStyled onClick={handleClick}>
      {x && x.images ? (
        <div className="itemImg">
          <img
            src={x.images[0]?.imageUrl}
            alt={x.images[0]?.imageUrl}
            className="img"
          ></img>
        </div>
      ) : (
        <p>No-Image</p>
      )}
      <div className="item-bottom">
        <div className="itemText">
          <p>{x.spaceName}</p>
          <p>{x.spaceLocation}</p>
          <div className="rate">
            <FaStar style={{ color: '#FEC01F' }} />
            <p className="rate-number">
              {x.spaceRating}({reviewCount})
            </p>
          </div>
          <p className="price">
            <span
              style={{ textDecoration: x.discount ? 'line-through' : 'none' }}
            >
              {x.spacePrice.toLocaleString()}원
            </span>
            {x.discount > 0 && (
              <>
                &nbsp;→&nbsp;
                <span className="discount">
                  {(x.spacePrice - x.discount).toLocaleString()}원
                  <span className="discount-tag">반짝특가</span>
                </span>
              </>
            )}
          </p>
        </div>
        <FontAwesomeIcon
          icon={faBookmark}
          className={`bookmark-icon ${isBookmarked ? 'active' : ''}`}
          onClick={toggleWishlist}
        />
      </div>
    </ItemListStyled>
  );
};
export default ItemList;
