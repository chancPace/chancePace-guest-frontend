import styled from 'styled-components';

export const HostInfoStyled = styled.div`
    text-align: center;
    width: 90%;
    .hostInfoImg {
        width: 300px;
        height: 100%;
        border-radius: ${({ theme }) => theme.borderRadius};
        margin-bottom: 5px;
    }
    .hostTitle {
        text-align: center;
        margin: auto;
        width: 250px;
        font-size: ${({ theme }) => theme.fontSizes.lg};
        font-weight: bold;
    }
    .hostText {
        width: 250px;
        margin: auto;
        text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.md};
    }

    @media screen and (max-width: 480px) {
        .hostInfoImg {
            width: 100%;
        }
        .hostText {
            margin-bottom: 5px;
        }
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
        .hostInfoImg {
            width: 100%;
        }
        .hostText {
            margin-bottom: 5px;
        }
    }
    @media screen and (min-width: 769px) and (max-width: 1024px) {
        margin: 50px 0;
    }
    @media screen and (min-width: 1025px) {
        margin: 50px 0;
    }
`;
