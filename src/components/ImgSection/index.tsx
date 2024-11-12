import { ImgSectionStyled, PreviewOverlay } from './styled';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper 및 SwiperSlide 가져오기
// import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
import { useState } from 'react';

interface ImageSectionProps {
  mainImg?: string;
  smallImgs: {
    src: string;
  }[];
}
const ImgSection = ({ mainImg, smallImgs }: ImageSectionProps) => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handlePreview = (src: string) => {
    setPreviewImg(src);
  };

  const handleClosePreview = () => {
    setPreviewImg(null);
  };

  //스몰 이미지 배열이 6개 미만일 경우 기본색상 채우기
  const fullSmallImg = [
    ...smallImgs,
    ...Array(6 - smallImgs.length).fill({ src: '' }), // 빈 문자열로 채운 객체 추가
  ];
  return (
    <ImgSectionStyled>
      <div className="mainImg">
        <img
          src={mainImg}
          alt={mainImg}
          onClick={() => handlePreview(mainImg || '')}
        ></img>
      </div>
      <div className="smallImgs">
        <Swiper
          spaceBetween={5}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          breakpoints={{
            480: {
              slidesPerView: 2,
              grid: {
                rows: 1,
              },
            },
            640: {
              slidesPerView: 2,
              grid: {
                rows: 2,
              },
            },
            768: {
              slidesPerView: 2,
              grid: {
                rows: 2,
              },
            },
            1024: {
              slidesPerView: 3,
              grid: {
                rows: 2,
              },
            },
          }}
          className="mySwiper"
        >
          {fullSmallImg?.map((x, i) => (
            <SwiperSlide key={i}>
              {x.src ? (
                <img
                  src={x.src}
                  alt={`small image ${i}`}
                  onClick={() => handlePreview(x.src)}
                />
              ) : (
                <div className="placeholder"></div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {previewImg && (
        <PreviewOverlay onClick={handleClosePreview}>
          <div className="previewImageContainer">
            <img src={previewImg} alt="Preview" />
          </div>
        </PreviewOverlay>
      )}
    </ImgSectionStyled>
  );
};
export default ImgSection;
