import { GetReviewData, Space } from '@/types';
import { ItemDetailStyled } from './styled';
import { Anchor, message, Pagination, Tabs } from 'antd';
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
  //리뷰 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  //리뷰 갯수 저장
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

  //주소 클립보드 복사
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success('클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        console.error('복사에 실패했습니다:', error);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

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
              <p className="rate-number">
                {space?.spaceRating}({reviews.length})
              </p>
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
                    title: `리뷰(${reviews.length})`,
                  },
                ]}
                offsetTop={60}
              />
            </div>
            <div id="part-1">
              <div className="section">
                <p className="section-title">공간소개</p>
                <p>{space?.description}</p>
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
                  )}
                  <p
                    onClick={() => copyToClipboard(space?.spaceLocation || '')}
                    className="location-text"
                  >
                    {space?.spaceLocation}
                  </p>
                </div>
              </div>
            </div>
            <div id="part-2">
              <div className="section">
                <p className="section-title">주의사항</p>
                <p>{space?.guidelines}</p>
              </div>
            </div>
            <div id="part-3">
              <div className="section">
                <p className="section-title">리뷰</p>

                {displayedReviews.length > 0 ? (
                  displayedReviews.map((x, i) => <ReviewList x={x} key={i} />)
                ) : (
                  <p>리뷰가 없습니다</p>
                )}
              </div>
              <Pagination
                current={currentPage}
                pageSize={reviewsPerPage}
                total={reviews.length}
                onChange={handlePageChange}
              />
            </div>
          </div>
          <div className="payment-section">
            <p className="payment-title">예약하기</p>
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
        </div>
      </div>
    </ItemDetailStyled>
  );
};
export default ItemDetail;
