import { MainStyled } from './styled';
import SearchBar from '@/components/SearchBar';
import ItemList from '@/components/ItemList';
import { message } from 'antd';
import Category from '@/components/Category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation } from 'swiper/modules';
import TrendingSpot from '@/components/TrendingSpot';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getCategory } from '@/pages/api/categoryApi';
import { getSpace } from '@/pages/api/spaceApi';
import Link from 'next/link';
import router from 'next/router';
import { CategoryType } from '@/types';
import Banner from '@/components/Banner';
interface ErrorResponseData {
  message: string;
}

const MainPage = () => {
  const [bigCategory, setBigCategory] = useState<CategoryType[]>([]);
  const [newSpace, setNewSpace] = useState([]);

  //카테고리(대분류) 띄우기
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        //대분류 가져오기
        setBigCategory(
          categoryData.data.filter(
            (category: { pId: null }) => category.pId === null
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

  //새로 등록된 공간(8개 출력)
  useEffect(() => {
    const fetchSpace = async () => {
      const spaceData = await getSpace();
      if (spaceData.data && spaceData.data.length > 0) {
        const top8Space = spaceData.data.slice(0, 8);
        setNewSpace(top8Space);
      }
    };
    fetchSpace();
  }, []);

  return (
    <MainStyled>
      <Banner />
      <div className="trendingSpot">
        <p className="trendingSpotTitle">이달의 공간</p>
        <div className="trendingSpotRight">
          <div className="slider">
            <Swiper
              spaceBetween={10}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1025: {
                  slidesPerView: 4,
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
      <div className="category">
        <p className="categoryTitle">최적의 장소를 찾아보세요!</p>
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
      <div className="searchbar">
        <SearchBar />
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
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
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
        <Link href="/newspace">
          <span className="more-link">새로운 장소 더보기</span>
        </Link>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">추천 장소</p>
        <div className="itemList">
          {newSpace.map((x, i) => {
            return <ItemList x={x} key={i} />;
          })}
        </div>
        <Link href="/recommendspace">
          <span className="more-link">추천 장소 더보기</span>
        </Link>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">주간 인기 장소</p>
        <div className="itemList">
          {newSpace.map((x, i) => {
            return <ItemList x={x} key={i} />;
          })}
        </div>
        <Link href="/popularspace">
          <span className="more-link">주간인기 장소 더보기</span>
        </Link>
      </div>
    </MainStyled>
  );
};
export default MainPage;
