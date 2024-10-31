import styled from 'styled-components';

export const TrendingSpotStyled = styled.div`
  width: 100%;
  text-align: center;
  height: 380px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: auto;
  object-fit: cover;
  display: flex;
  align-items: end;
  background-color: white;
  position: relative;
  background-color: pink;
  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    object-fit: cover;
  }

  .trandingSpotText {
    position: absolute;
    bottom: 5%;
    left: 5%;
    transform: translate(-5%, -5%);
    color: white;
    text-align: left;
    > p:first-child {
      margin-bottom: 10px;
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
`;
