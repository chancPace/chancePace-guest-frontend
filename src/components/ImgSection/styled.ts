import styled from 'styled-components';

export const ImgSectionStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 400px;
    .mainImg {
        width: 49.5%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            border-radius: ${({ theme }) => theme.borderRadius};
        }
    }
    .smallImgs {
        width: 50%;
        height: 400px;
        overflow: hidden;
        .swiper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            width: 100%;
            height: 50%; /* 슬라이드가 전체 높이의 50%를 차지하도록 설정 */
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: ${({ theme }) => theme.borderRadius};
            }
        }
    }
`;
