import styled from 'styled-components';

export const HostStyled = styled.div`
    background-color: white;
    width: 100%;

    .infoTitle {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        margin: 30px 0 0 50px;
    }
    .procedureTitle {
        font-size: ${({ theme }) => theme.fontSizes.xl};
        margin: 30px 0 0 50px;
    }
    .go {
        margin: 100px 0 50px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSizes.xxxl};
        .hostButton {
            padding: 20px 50px;
            margin-left: 20px;
        }
    }
    @media screen and (max-width: 480px) {
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
        .infoTitle {
            text-align: center;
            margin: 20px;
        }
    }
    @media screen and (min-width: 769px) and (max-width: 1024px) {
    }
    @media screen and (min-width: 1025px) {
    }
`;
