import styled from 'styled-components';
import host from '../../assets/image/host.jpg';
import main from '../../assets/image/main.jpg';
export const MainStyled = styled.div`
  width: 100%;
  padding-top: 70px !important;
  margin-bottom: 100px;
  max-width: 1280px;
  margin: auto;
  color: #212529;
  .banner-swiper {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
    border-radius: 8px;
    object-fit: cover;
  }
  .swiper-button-next,
  .swiper-button-prev {
    visibility: hidden;
  }

  .swiper:hover {
    cursor: pointer;
    .swiper-button-next,
    .swiper-button-prev {
      visibility: visible;
      color: white;
    }
  }
  .trendingSpot {
    margin: auto;
    .itemListTitle {
      font-size: 35px;
    }
    .trendingSpotRight {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      .slider {
        width: 100%;
      }
    }
  }
  .search-zone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
    padding: 50px 50px;
    margin-bottom: 50px;
    .category {
      width: 100%;
      max-width: 1280px;
      .category-title {
        margin-bottom: 10px;
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        color: black;
        font-weight: 500;
      }
      .categoryList {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  }

  .placeSection {
    width: 100%;
    margin-top: 100px;
    .swiper {
      padding-bottom: 10px;
      padding: 5px;
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: ${({ theme }) => theme.color.textDark};
    }
    .swiper-button-next {
      right: 10px;
      top: 40%;
    }
    .swiper-button-prev {
      left: 10px;
      top: 40%;
    }
    .itemListTitle {
      font-size: 35px;
      margin-bottom: 15px;
      font-weight: bold;
      color: #363636;
    }
    .more-link {
      background-color: #f1f3f5;
      width: 200px;
      padding: 10px;
      display: block;
      text-align: center;
      margin: 50px auto;
      color: black;
      cursor: pointer;
    }
  }
  .hostSection {
    width: 100%;
    height: 300px;
    background-color: #8c73d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 8px;
    .hostSectionImg {
      width: 100%;
      height: 100%;
      background-image: url(${host.src});
      background-position: center;
      background-size: cover;
      border-radius: 8px;
    }
    .hostSectionText {
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translate(-10%, -50%);
      background-color: rgba(255, 255, 255, 0.8);
      padding: 20px;
      border-radius: 8px;
      > p:nth-of-type(1) {
        font-size: 35px;
      }
      > p:nth-of-type(2) {
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
  .itemListTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin-bottom: 15px;
    font-weight: bold;
  }
  .buttonBox {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }

  .itemList {
    place-items: center;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  @media screen and (max-width: 689px) {
    .trendingSpot {
      .itemListTitle {
        font-size: 25px;
      }
    }
    .placeSection {
      .itemListTitle {
        font-size: 25px;
      }
      .more-link {
        font-size: 16px;
      }
    }
    .itemList {
      grid-template-columns: repeat(1, 1fr);
      gap: 5px;
    }
    .category {
      .category-title {
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }
    }
  }
  @media screen and (min-width: 690px) and (max-width: 768px) {
    .trendingSpot {
      .itemListTitle {
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }
    }
    .placeSection {
      .itemListTitle {
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }
    }
    .itemList {
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .itemList {
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
    }
  }
`;
