import { MainStyled } from './styled';
import SearchBar from '@/components/SearchBar';
import ItemList from '@/components/ItemList';
import { space, category } from '@/utill/datas';
import { Button, message } from 'antd';
import Category from '@/components/Category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation } from 'swiper/modules';
import TrendingSpot from '@/components/TrendingSpot';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getCategory } from '@/pages/api/categoryApi';
interface ErrorResponseData {
  message: string;
}

const MainPage = () => {
  const [bigCategory, setBigCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        console.log(categoryData, '카테고리데이터');
        setBigCategory(
          categoryData.data.filter(
            (category: { pId: null }) => category.pId === null
          )
        );
        console.log(bigCategory, '빅카테고리');
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;
        if (axiosError.response?.status === 500) {
          message.error(axiosError.response.data.message);
        }
      }
    };
    fetchCategory();
  }, []);
  return (
    <MainStyled>
      <div className="trendingSpot">
        <p className="trendingSpotTitle">이달의 공간</p>
        <div className="trendingSpotRight">
          <div className="slider">
            <Swiper
              spaceBetween={10}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                480: {
                  slidesPerView: 1, // 480px 이하에서는 한 슬라이드만 보이게 설정
                },
                768: {
                  slidesPerView: 2, // 481px 이상 768px 이하에서는 두 슬라이드
                },
                1024: {
                  slidesPerView: 3, // 769px 이상 1024px 이하에서는 세 슬라이드
                },
                1025: {
                  slidesPerView: 4, // 1025px 이상에서는 네 슬라이드
                },
              }}
            >
              {space.map((x, i) => {
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
          {category.map((x, i) => {
            return <Category x={x} key={i} />;
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
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
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
          {space.map((x, i) => (
            <SwiperSlide key={i}>
              <ItemList x={x} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="buttonBox">
          <Button className="button">New Place 더보기</Button>
        </div>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">추천 장소</p>
        <div className="itemList">
          {space.map((x, i) => {
            return <ItemList x={x} key={i} />;
          })}
        </div>
        <div className="buttonBox">
          <Button className="button">추천 장소 더보기</Button>
        </div>
      </div>
      <div className="placeSection">
        <p className="itemListTitle">주간 인기 장소</p>
        <div className="itemList">
          {space.map((x, i) => {
            return <ItemList x={x} key={i} />;
          })}
        </div>
        <div className="buttonBox">
          <Button className="button">인기 장소 더보기</Button>
        </div>
      </div>
    </MainStyled>
  );
};
export default MainPage;
