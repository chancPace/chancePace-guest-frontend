import styled from 'styled-components';

export const WishListStyled = styled.div`
  width: 200px;
  .wish-img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .wish-info-top {
    display: flex;
    justify-content: space-between;
    .wish-icon {
      cursor: pointer;
    }
  }
`;
