import styled from 'styled-components';

export const FooterStyled = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-top: 1px solid black;
    .footer1 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        > p {
            margin: 10px;
            cursor: pointer;
        }
    }
    .footer2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        > div {
            display: flex;
            margin: 10px;
        }
    }
    .footer3 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border-bottom: 1px solid white;
        > p {
            margin: 10px;
        }
    }
    .footer4 {
        display: flex;
        justify-content: space-between;
    }
`;
