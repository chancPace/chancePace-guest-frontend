import { GetReviewData, Space } from '@/types';
import { ItemDetailStyled } from './styled';
import { Anchor, Tabs } from 'antd';
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

const ItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  //공간 저장
  const [space, setSpace] = useState<Space | null>(null);

  //리뷰저장
  const [reviews, setReviews] = useState<GetReviewData[]>([]);
  //리뷰 갯수 저장
  // const [reviewCount, setReviewCount] = useState<number>(0);
  const spacePrice = space?.spacePrice?.toLocaleString();

  //공간 데이터 가져오기
  useEffect(() => {
    if (id) {
      const fetchSpace = async () => {
        try {
          const response = await getOneSpace(Number(id));
          console.log(response);
          setSpace(response.data);
        } catch (error) {
          console.error('공간 정보를 불러오지 못했습니다.', error);
        }
      };
      fetchSpace();
    }
  }, [id]);

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

  return (
    <ItemDetailStyled>
      <div className="detail-top">
        <ImgSection
          mainImg={space?.images[0].imageUrl}
          smallImgs={
            space?.images?.slice(1)?.map((img) => ({
              src: img.imageUrl,
            })) || []
          }
        />
        <div className="detail-top-text">
          <div className="space-title">
            <p className="space-name">{space?.spaceName}</p>
            <p className="space-location">{space?.spaceLocation}</p>
            <div className="rate">
              <FaStar style={{ color: '#000000' }} />
              <p className="rate-number">{space?.spaceRating}</p>
            </div>
          </div>

          <div className="space-price">
            {space?.discount ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                  {space?.spacePrice.toLocaleString()}원
                </span>
                &nbsp;→&nbsp;
                <span>
                  {(space.spacePrice - space.discount).toLocaleString()}원~
                </span>
              </>
            ) : (
              <span>{spacePrice}원~</span>
            )}
          </div>
        </div>
      </div>
      <div className="detail-bottom">
        <div className="detail-info">
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
                addPrice={space.addPrice}
              />
            )}
          </div>
          <div className="anchor-sections">
            <div className="anchor-title">
              <Anchor
                direction="horizontal"
                items={[
                  {
                    key: 'part-1',
                    href: '#part-1',
                    title: '공간정보',
                  },
                  {
                    key: 'part-2',
                    href: '#part-2',
                    title: '주의사항',
                  },
                  {
                    key: 'part-3',
                    href: '#part-3',
                    title: '리뷰',
                  },
                ]}
              />
            </div>
            <div id="part-1" style={{ padding: '20px 0' }}>
              <div className="section">
                <p className="section-title">공간소개</p>
                <p>{space?.description}</p>
                <p>
                  영업시간: {space?.businessStartTime}:00 -{' '}
                  {space?.businessEndTime}:00
                </p>
              </div>
              <div className="section">
                <p className="section-title">편의시설</p>
                <p>{space?.amenities}</p>
              </div>
              <div className="section">
                <p className="section-title">위치</p>
                <div className="map">
                  {space?.spaceLocation && (
                    <KakaoMap address={space.spaceLocation} />
                  )}{' '}
                  <p>{space?.spaceLocation}</p>
                </div>
              </div>
            </div>
            <div id="part-2" style={{ backgroundColor: 'green' }}>
              <div className="section">
                <p className="section-title">주의사항</p>
                <p>{space?.guidelines}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Impedit, explicabo saepe neque hic labore maiores illum
                  dignissimos esse assumenda velit necessitatibus, laboriosam,
                  sint similique quia architecto vel atque itaque earum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Impedit, explicabo saepe neque hic labore maiores illum
                  dignissimos esse assumenda velit necessitatibus, laboriosam,
                  sint similique quia architecto vel atque itaque earum.
                </p>
              </div>
            </div>
            <div
              id="part-3"
              style={{ height: '50vh', backgroundColor: 'pink' }}
            >
              {reviews && reviews.length > 0 ? (
                reviews.map((x, i) => <ReviewList x={x} key={i} />)
              ) : (
                <p>리뷰가 없습니다</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ItemDetailStyled>
  );
};
export default ItemDetail;
