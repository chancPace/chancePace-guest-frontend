import { GetReviewData, Space } from '@/types';
import { ItemDetailStyled } from './styled';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import KakaoMap from '../KakaoMap';
import ReservationSticky from '../ReservationSticky';
import { useEffect, useState } from 'react';
import { getReviewBySpace } from '@/pages/api/reviewApi';
import ReviewList from '../ReviewList';
import ImgSection from '../ImgSection';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { getOneSpace } from '@/pages/api/spaceApi';

// interface ItemDetailProps {
//   space: Space;
// }
const ItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [space, setSpace] = useState<Space | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);
  console.log(space, '스페이스스스스');
  useEffect(() => {
    if (id) {
      const fetchSpace = async () => {
        try {
          const response = await getOneSpace(Number(id));
          setSpace(response.data);
        } catch (error) {
          console.error('공간 정보를 불러오지 못했습니다.', error);
        }
      };
      fetchSpace();
    }
  }, [id]);
  // console.log(space, 'ㅎ스페이스스스스');
  const [reviews, setReviews] = useState<GetReviewData[]>([]);
  // 공간에 대한 리뷰 가져오기
  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const response = await getReviewBySpace(Number(id));
          setReviews(response.data);
        } catch (error) {
          console.error('리뷰를 불러오지 못했습니다.', error);
        }
      };
      fetchReviews();
    }
  }, [id]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '공간 정보',
      children: (
        <div className="tab">
          <p className="detail-title">[공간 정보]</p>
          <p>{space?.description}</p>
          <p>{space?.spacePrice?.toLocaleString()}원</p>
          <div>
            <p className="detail-title">[편의 시설]</p>

            <p style={{ marginBottom: '16px' }}>{space?.amenities}</p>
          </div>
          <div className="map">
            {space?.spaceLocation && <KakaoMap address={space.spaceLocation} />}{' '}
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: '주의사항',
      children: <div>{space?.guidelines}</div>,
    },
    {
      key: '3',
      label: `후기 (${reviews.length})`, // 후기 개수 표시
      children: (
        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((x, i) => <ReviewList x={x} key={i} />)
          ) : (
            <p>등록된 후기가 없습니다.</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <ItemDetailStyled>
      {/* <ImgSection
        mainImg={`http://localhost:4000/${space.images[0].imageUrl}`}
        smallImgs={space?.images.slice(1).map((img) => ({
          src: `http://localhost:4000/${img.imageUrl}`,
        }))}
      /> */}
      <div className="spaceTitle">
        <p>{space?.spaceName}</p>
        <p>최대 인원 {space?.maxGuests}명</p>
        <p>{space?.spaceLocation}</p>
      </div>
      <div className="rate">
        <FaStar style={{ color: '#FEC01F' }} />
        <p className="rate-number">{space?.spaceRating}</p>
      </div>
      <div className="detailBottom">
        <div className="tabWrap">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
        <div className="paymentSection">
          {space && (
            <ReservationSticky
              price={space.spacePrice}
              businessStartTime={space.businessStartTime}
              businessEndTime={space.businessEndTime}
              spaceId={space.id}
              cleanTime={space.cleanTime}
              discount={space.discount}
              maxGuests={space.maxGuests}
              minGuests={space.minGuests}
            />
          )}
        </div>
      </div>
    </ItemDetailStyled>
  );
};
export default ItemDetail;
