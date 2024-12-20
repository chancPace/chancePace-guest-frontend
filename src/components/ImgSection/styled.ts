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
      &:hover {
        opacity: 0.8;
        transition: 0.5s;
      }
    }
  }
  .smallImgs {
    width: 50%;
    overflow: hidden;
    .swiper {
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .swiper-slide {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: #f7f7f7f7;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${({ theme }) => theme.borderRadius};

        cursor: pointer;
        &:hover {
          opacity: 0.8;
          transition: 0.5s;
        }
      }
    }
  }

  @media screen and (max-width: 479px) {
    flex-direction: column;
    height: 300px;
    .mainImg {
      width: 100%;
      height: 200px;
      margin-bottom: 10px;
      img {
        height: 100%;
      }
    }
    .smallImgs {
      width: 100%;
      height: 200px;
      .swiper-slide {
        height: 100%;

        img {
          height: 100%;
        }
      }
    }
  }
`;

export const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000000;
  cursor: pointer;

  .previewImageContainer {
    width: 80%;
    height: 80%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
