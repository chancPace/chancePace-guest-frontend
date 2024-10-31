import styled from 'styled-components';

export const SpaceListStyled = styled.div`
  padding: 20px;
  .title {
    text-align: center;
    margin: 50px 0;
  }
  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media screen and (max-width: 480px) {
    .list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    .list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1025px) {
  }
`;
