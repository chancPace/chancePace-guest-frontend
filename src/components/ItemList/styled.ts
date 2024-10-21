import styled from 'styled-components';

export const ItemListStyled = styled.div<{ isTrending?: boolean }>`
    width: ${({ isTrending }) => (isTrending ? '320px' : '290px')};
    height: ${({ isTrending }) => (isTrending ? '310px' : '280px')};
    background-color: ${({ isTrending }) =>
        isTrending ? 'rgba(255,255,255,0.2)' : 'none'};
    border: ${({ isTrending }) =>
        isTrending ? 'none' : '1px solid lightgray'};
    margin: 10px;
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    .itemImg {
        margin: auto;
        width: 95%;
        border-radius: ${({ theme }) => theme.borderRadius};
        .img {
            width: 100%;
            border-radius: ${({ theme }) => theme.borderRadius};
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
                color: ${({ theme }) => theme.color.textDark};
            }
            &:nth-of-type(3) {
                font-size: ${({ theme }) => theme.fontSizes.sm};
            }
        }
    }
`;
