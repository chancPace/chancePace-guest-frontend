import { ImgSectionStyled } from './styled';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper 및 SwiperSlide 가져오기
// import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Grid, Pagination } from 'swiper/modules';

interface ImageSectionProps {
    mainImg: string;
    smallImgs: {
        src: string;
    }[];
}
const ImgSection: React.FC<ImageSectionProps> = ({ mainImg, smallImgs }) => {
    return (
        <ImgSectionStyled>
            <div className="mainImg">
                <img src={mainImg} alt={mainImg}></img>
            </div>
            <div className="smallImgs">
                <Swiper
                    slidesPerView={3}
                    grid={{
                        rows: 2,
                    }}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Grid, Pagination]}
                    breakpoints={{
                        // 화면 너비가 1024px 이상일 때
                        1024: {
                            slidesPerView: 3, // 슬라이드 3개
                            grid: {
                                rows: 2, // 2줄 설정
                            },
                        },
                        // 화면 너비가 768px 이상일 때
                        768: {
                            slidesPerView: 2, // 슬라이드 2개
                            grid: {
                                rows: 2, // 2줄 설정
                            },
                        },
                        // 화면 너비가 640px 이상일 때
                        640: {
                            slidesPerView: 1, // 슬라이드 1개
                            grid: {
                                rows: 2, // 2줄 설정
                            },
                        },
                        // 화면 너비가 480px 이하일 때
                        480: {
                            slidesPerView: 1, // 슬라이드 1개
                            grid: {
                                rows: 2, // 2줄 설정
                            },
                        },
                    }}
                    className="mySwiper"
                >
                    {smallImgs.map((x, i) => (
                        <SwiperSlide key={i}>
                            <img src={x.src} alt={`small image ${i}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </ImgSectionStyled>
    );
};
export default ImgSection;
