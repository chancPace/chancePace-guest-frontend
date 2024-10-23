import styled from 'styled-components';

export const HostStyled = styled.div`
    background-color: white;
    width: 100%;
    padding: 10px;
    .infoTitle {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        margin-top: 100px;
        text-align: center;
    }
    .hostInfo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: top;
        text-align: center;
    }
    .procedureTitle {
        font-size: ${({ theme }) => theme.fontSizes.xl};
        text-align: center;
        margin-top: 100px;
    }
    .hostProcedure {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .go {
        margin: 100px 0 50px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSizes.xxxl};
        flex-direction: column;

        .hostButton {
            padding: 20px 50px;
            margin-left: 20px;
        }
    }
    @media screen and (max-width: 480px) {
        .infoTitle {
            text-align: center;
            margin: 20px;
        }
        .hostInfo {
            flex-direction: column;
            align-items: center;
        }
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
        .infoTitle {
            text-align: center;
            margin: 20px;
        }
        .hostInfo {
            flex-direction: column;
            align-items: center;
        }
        .hostProcedure {
            flex-direction: column;
            text-align: center;
        }
    }
    @media screen and (min-width: 769px) and (max-width: 1024px) {
    }
    @media screen and (min-width: 1025px) {
    }
`;
