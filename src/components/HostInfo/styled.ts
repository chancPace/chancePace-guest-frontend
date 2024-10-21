import styled from 'styled-components';

export const HostInfoStyled = styled.div`
    width: 100%;
    text-align: center;
    .info {
        display: flex;
        justify-content: center;
        div {
            margin: 0 10px;
            width: 350px;
            img {
                width: 100%;
                height: 260px;
                border-radius: ${({ theme }) => theme.borderRadius};
                margin-bottom: 5px;
            }
            .hostTitle {
                font-size: ${({ theme }) => theme.fontSizes.lg};
                font-weight: bold;
            }
            .hostText {
                font-size: ${({ theme }) => theme.fontSizes.md};
            }
        }
    }
    @media screen and (max-width: 480px) {
        margin: 20px 0;
        .info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            div {
                .img {
                    width: 100%;
                }
                .hostTitle {
                    text-align: left;
                }
                .hostText {
                    text-align: left;
                    margin-bottom: 5px;
                }
            }
        }
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
        margin: 30px 0;
        .info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            div {
                .img {
                    width: 100%;
                }
                .hostTitle {
                    text-align: left;
                }
                .hostText {
                    text-align: left;
                    margin-bottom: 5px;
                }
            }
        }
    }
    @media screen and (min-width: 769px) and (max-width: 1024px) {
        margin: 50px 0;
    }
    @media screen and (min-width: 1025px) {
        margin: 50px 0;
    }
`;
