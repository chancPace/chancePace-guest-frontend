import styled from 'styled-components';
export const BannerStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  > a {
    > img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
