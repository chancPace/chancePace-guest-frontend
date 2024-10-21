import { MainStyled } from './styled';
import SearchBar from '@/components/SearchBar';
import ItemList from '@/components/ItemList';
import { space, category } from '@/utill/datas';
import { Button } from 'antd';
import Category from '@/components/Category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation } from 'swiper/modules';

const MainPage = () => {

    return (
        <MainStyled>
            <div className="trendingSpot">
                <div className="trendingSpotLeft">
                    <p className="trendingSpotTitle">Trending Spots</p>
                </div>
                <div className="trendingSpotRight">
                    <div className="slider">
                        <Swiper
                            spaceBetween={30}
                            autoplay={{
                                delay: 2000, // 3초마다 슬라이드 전환
                                disableOnInteraction: false,
                            }}
                            loop={true} // 무한 반복
                            modules={[Autoplay]} // 모듈 사용 선언
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
                                    slidesPerView: 3, // 1025px 이상에서는 네 슬라이드
                                },
                            }}
                        >
                            {space.map((x, i) => (
                                <SwiperSlide key={i}>
                                    <ItemList
                                        x={x}
                                        isTrending={true} // 새로운 prop 추가
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="category">
                <p className="categoryTitle">Find your perfect space now</p>
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
                <p className="itemListTitle">New Place</p>
                <Swiper
                    spaceBetween={30}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    breakpoints={{
                        480: {
                            slidesPerView: 2, // 480px 이하에서는 한 슬라이드만 보이게 설정
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
                    {space.map((x, i) => (
                        <SwiperSlide key={i}>
                            <ItemList x={x} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="buttonBox">
                    <Button>New Place 더보기</Button>
                </div>
            </div>
            <div className="placeSection">
                <p className="itemListTitle">추천 장소</p>
                <div className="itemList">
                    {space.map((x, i) => {
                        console.log(x);
                        return <ItemList x={x} key={i} />;
                    })}
                </div>
                <div className="buttonBox">
                    <Button>추천 장소 더보기</Button>
                </div>
            </div>
            <div className="placeSection">
                <p className="itemListTitle">주간 인기 장소</p>
                <div className="itemList">
                    {space.map((x, i) => {
                        console.log(x);
                        return <ItemList x={x} key={i} />;
                    })}
                </div>
                <div className="buttonBox">
                    <Button>인기 장소 더보기</Button>
                </div>
            </div>
        </MainStyled>
    );
};
export default MainPage;
