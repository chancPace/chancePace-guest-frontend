import styled from 'styled-components';

export const MainStyled = styled.div`
    width: 95%;
    margin: auto;
    margin-bottom: 100px;
    .searchbarBg {
        height: 200px;
        display: flex;
        align-items: center;
    }
    .trendingSpot {
        background-color: #eb5b00;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        position: relative;

        .trendingSpotLeft {
            position: absolute;
            top: 50%;
            left: 5%;
            transform: translate(-5%, -50%);
            z-index: 100000;
            .trendingSpotTitle {
                font-size: ${({ theme }) => theme.fontSizes.xxxl};
                color: white;
                /* color: ; */
            }
        }
        .trendingSpotRight {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            .slider {
                width: 85%;
            }
        }
    }
    .category {
        width: 100%;
        justify-content: center;
        display: flex;
        margin-top: 100px;
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
        }
        .buttonBox {
            width: 100%;
            text-align: center;
        }
    }

    .itemList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-content: center;
    }
`;
