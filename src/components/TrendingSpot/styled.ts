import styled from 'styled-components';

export const TrendingSpotStyled = styled.div`
    width: 100%;
    text-align: center;
    width: 280px;
    height: 500px;
    border-radius: ${({ theme }) => theme.borderRadius};
    margin: auto;
    object-fit: cover;
    display: flex;
    align-items: end;
    background-color: white;
    position: relative;
    img {
        width: 100%;
        height: 90%;
        border-radius: ${({ theme }) => theme.borderRadius};
        cursor: pointer;
    }
    .trandingSpotText {
        position: absolute;
        bottom: 5%;
        left: 5%;
        transform: translate(-5%, -5%);
        color: white;
        text-align: left;
        >p:first-child {
            margin-bottom: 10px;
            font-size: ${({ theme }) => theme.fontSizes.xl};

        }
    }
`;
