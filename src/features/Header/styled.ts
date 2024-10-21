import styled from 'styled-components';

export const HeaderStyled = styled.div`
    width: 100vw;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background-color: white;
    z-index: 1000000;

    nav {
        width: 95%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        .logo {
            text-align: left;
            font-size: ${({ theme }) => theme.fontSizes.xl};
        }
        .userBar {
            display: flex;
            align-items: center;
            >p {
                margin-left: 25px;
                cursor: pointer;
            }
            .hostMenuBar {
                padding: 10px;
                background-color: gray;
                color: white;
                border-radius: 8px;
            }
            span {
                margin-right: 5px;
                cursor: pointer;
            }
        }
    }
`;
