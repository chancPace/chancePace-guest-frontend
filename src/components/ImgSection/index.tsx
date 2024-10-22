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
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Grid, Pagination]}
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
