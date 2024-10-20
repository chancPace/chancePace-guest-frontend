import styled from 'styled-components';

export const FooterStyled = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background-color: #F6F5F2;
    padding: 20px;
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
            margin: 5px;
        }
    }
    .footer3 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        > p {
            margin: 0 10px;
        }
    }
    .footer4 {
        text-align: center;
        margin-top: 20px;
        > p:nth-of-type(2) {
            margin: 5px 10px;
            cursor: pointer;
        }
    }
`;
