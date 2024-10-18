import styled from 'styled-components';

export const HeaderStyled = styled.div`
    width: 100vw;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.md};
    nav {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            font-size: ${({ theme }) => theme.fontSizes.xl};
        }
        span {
            padding: 0 10px;
        }
    }
`;
