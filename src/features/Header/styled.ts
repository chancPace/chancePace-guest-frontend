import styled from 'styled-components';

export const HeaderStyled = styled.div`
    width: 100vw;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
    background-color: white;
    z-index: 1000;
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
            span {
                margin-left: 25px;
            }
        }
    }
`;
