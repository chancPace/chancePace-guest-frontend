import styled from 'styled-components';

export const MainStyled = styled.div`
  width: 100%;
  padding: 0 10px;
  margin: auto;
  margin-bottom: 100px;
  max-width: 1280px;
  .banner-swiper {
    height: 200px;
    margin-bottom: 50px;
  }
  .swiper-button-next,
  .swiper-button-prev {
    visibility: hidden;
  }
  .swiper {
    padding: 5px;
  }
  .swiper:hover {
    cursor: pointer;
    .swiper-button-next,
    .swiper-button-prev {
      visibility: visible;
      color: white;
    }
  }
  .searchbar {
    max-width: 1280px;
    height: 100px;
    display: flex;
    align-items: center;
  }
  .trendingSpot {
    margin: auto;
    .trendingSpotTitle {
      font-weight: bold;
      color: #363636;
      font-size: 35px;
      z-index: 100000;
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
  .category {
    width: 100%;
    max-width: 1280px;
    margin-top: 100px;
    .category-title {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      color: #8c73d8;
    }
    .categoryList {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
  .placeSection {
    width: 100%;
    margin-top: 100px;
    .swiper {
      padding-bottom: 10px;
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
    }
  }

  .itemList {
    place-items: center;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
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

  @media screen and (min-width: 1025px) {
    padding: 0 50px;
  }
`;
