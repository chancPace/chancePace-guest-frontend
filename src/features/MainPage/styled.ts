import styled from 'styled-components';

export const MainStyled = styled.div`
    width: 95%;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 50px;
    .searchbar {
        height: 100px;
        display: flex;
        align-items: center;
    }
    .trendingSpot {
        margin: auto;
        position: relative;
        background-color: white;
        .trendingSpotLeft {
            position: absolute;
            top: 1%;
            left: 5%;
            transform: translate(-5%, -1%);
            z-index: 100000;
            color: black;
            /* mix-blend-mode: difference; */
            .trendingSpotTitle {
                font-size: ${({ theme }) => theme.fontSizes.xxxl};
                border-bottom: 2px solid black;
                font-weight: bold;
            }
        }
        .trendingSpotRight {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            .slider {
                width: 90%;
            }
        }
    }
    .category {
        width: 100%;
        margin-top: 100px;
        .categoryTitle {
            text-align: center;
            font-size: ${({ theme }) => theme.fontSizes.xxl};
            background-color: gray;
            color: white;
        }
        .categoryList {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
    }
    .placeSection {
        width: 100%;
        margin-top: 100px;
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
            font-size: ${({ theme }) => theme.fontSizes.xxl};
            margin-bottom: 15px;
            font-weight: bold;
        }
        .buttonBox {
            margin-top: 20px;
            width: 100%;
            text-align: center;
        }
    }

    .itemList {
        place-items: center;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    @media screen and (max-width: 480px) {
        .placeSection {
            .itemListTitle {
                font-size: ${({ theme }) => theme.fontSizes.lg};
            }
        }
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
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
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
        }
    }
    @media screen and (min-width: 1025px) {
    }
`;
