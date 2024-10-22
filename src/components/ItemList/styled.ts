import styled from 'styled-components';

export const ItemListStyled = styled.div<{ isTrending?: boolean }>`
    background-color: ${({ isTrending }) =>
        isTrending ? 'rgba(255,255,255,0.9)' : 'none'};
    width: 95%;
    height: 350px;
    border: ${({ isTrending }) =>
        isTrending ? 'none' : '1px solid lightgray'};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    .itemImg {
        margin: auto;
        /* width: 100%; */
        height: 270px;
        display: flex;
        align-items: center;
        border-radius: ${({ theme }) => theme.borderRadius};
        object-fit: cover;
        .img {
            width: 100%;
            border-radius: 8px 8px 0 0;
            height: 100%;
            object-fit: cover;
        }
    }
    .itemText {
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
            margin-bottom: 5px;
            &:nth-of-type(1) {
                font-weight: bold;
            }
            &:nth-of-type(2) {
                font-size: ${({ theme }) => theme.fontSizes.sm};
                color: gray;
            }
            &:nth-of-type(3) {
                font-size: ${({ theme }) => theme.fontSizes.sm};
            }
        }
    }
`;
