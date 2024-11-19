import { MainStyled } from './styled';
import SearchBar from '@/components/SearchBar';
import ItemList from '@/components/ItemList';
import { Button, message } from 'antd';
import Category from '@/components/Category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import TrendingSpot from '@/components/TrendingSpot';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getCategory } from '@/pages/api/categoryApi';
import { getSpace } from '@/pages/api/spaceApi';
import { useRouter } from 'next/router';
import { CategoryType, Space } from '@/types';
import Banner from '@/components/Banner';
import { banner } from '@/utill/datas';
import Link from 'next/link';

interface ErrorResponseData {
  message: string;
}

const MainPage = () => {
  const router = useRouter();
  const [bigCategory, setBigCategory] = useState<CategoryType[]>([]);
  //새로운 장소
  const [newSpace, setNewSpace] = useState([]);
  //추천 장소
  const [recommendedSpace, setRecommendedSpace] = useState<Space[]>([]);
  //인기 장소
  const [popularSpace, setPopularSpace] = useState<Space[]>([]);

  //카테고리(대분류) 가져오기
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        //대분류 가져오기
        setBigCategory(
          categoryData.data.filter(
            (category: CategoryType) => category.pId === null
          )
        );
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;
        if (axiosError.response?.status === 500) {
          message.error(axiosError.response.data.message);
        }
      }
    };
    fetchCategory();
  }, []);

  //카테고리 클릭
  const handleCategoryClick = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  //더 보기 버튼 클릭
  const handleTypeClick = (type: string) => {
    router.push(`/spacelist/${type}`);
  };

  //공간 타입별 출력
  useEffect(() => {
    const fetchSpaces = async () => {
      const spaceData = await getSpace();
      if (spaceData?.data) {
        //available 상태인것만 가져오기
        const availableSpace = spaceData.data.filter(
          (space: Space) =>
            space.spaceStatus === 'AVAILABLE' &&
            space.isOpen === true &&
            space.isDelete === false
        );
        //새로운 장소 설정
        setNewSpace(availableSpace.slice(0, 8));
        //추천장소 설정 (랜덤)
        setRecommendedSpace(
          availableSpace.sort(() => Math.random() - 0.5).slice(0, 8)
        );
        //인기 장소 (예약 많은 순)
        setPopularSpace(
          availableSpace
            .sort(
              (a: Space, b: Space) =>
                (b.bookings?.length || 0) - (a.bookings?.length || 0)
            )
            .slice(0, 8)
        );
      }
    };
    fetchSpaces();
  }, []);

  return (
    <MainStyled>
      <Swiper
        className="banner-swiper"
        spaceBetween={20}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        breakpoints={{
          360: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {banner.map((x, i) => (
          <SwiperSlide key={i}>
            <Banner x={x} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="trendingSpot">
        <div>이달의 공간</div>
        <p className="itemListTitle">Monthly Space</p>
        <div className="trendingSpotRight">
          <div className="slider">
            <Swiper
              spaceBetween={10}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              breakpoints={{
                689: {
                  slidesPerView: 1,
                },
                690: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
                1025: {
                  slidesPerView: 2,
                },
              }}
            >
              {newSpace.map((x, i) => {
                return (
                  <SwiperSlide key={i}>
                    <TrendingSpot x={x} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="search-zone">
        <div className="category">
          <p className="category-title">최적의 장소를 찾아보세요!</p>
          <div className="categoryList">
            {bigCategory.map((x, i) => {
              return (
                <Category
                  x={x}
                  key={i}
                  onClick={() => handleCategoryClick(x.id)}
                />
              );
            })}
          </div>
        </div>
        <div className="searchar">
          <SearchBar />
        </div>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">새로운 장소</p>
        <Swiper
          className="swiper"
          spaceBetween={15}
          loop={true}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            689: {
              slidesPerView: 1,
            },
            690: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1025: {
              slidesPerView: 4,
            },
          }}
        >
          {newSpace.map((x, i) => (
            <SwiperSlide key={i}>
              <ItemList x={x} />
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="more-link" onClick={() => handleTypeClick('new')}>
          새로운 장소 더보기
        </span>
      </div>
      <div className="hostSection">
        <div className="hostSectionImg"></div>
        <div className="hostSectionText">
          <p>Share your space</p>
          <p>여러분의 공간을 공유하세요</p>
          <Link href="/host">
            <Button htmlType="button">Go! HostCenter</Button>
          </Link>
        </div>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">추천 장소</p>
        <div className="itemList">
          {recommendedSpace.map((x, i) => {
            return <ItemList x={x} key={i} />;
          })}
        </div>
        <span
          className="more-link"
          onClick={() => handleTypeClick('recommended')}
        >
          추천 장소 더보기
        </span>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">주간 인기 장소</p>
        <div className="itemList">
          {popularSpace.map((x, i) => {
            return <ItemList x={x} key={i} />;
          })}
        </div>
        <span className="more-link" onClick={() => handleTypeClick('popular')}>
          주간인기 장소 더보기
        </span>
      </div>
    </MainStyled>
  );
};
export default MainPage;
