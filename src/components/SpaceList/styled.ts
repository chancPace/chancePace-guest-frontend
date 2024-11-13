import styled from 'styled-components';

export const SpaceListStyled = styled.div`
  padding: 10px;
  /* background-color: pink; */
  height: 100vh;
  .title {
    text-align: center;
    padding: 80px 0 10px 0;
  }
  .type-title {
    > span {
      display: block;
      font-size: 18px;
      font-weight: lighter;
      color: gray;
    }
  }
  .list {
    width: 100%;
    display: grid;
    gap: 10px;
    position: relative;
    .no-item {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
    }
  }
  .subcategory-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  .ant-pagination {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  @media screen and (max-width: 500px) {
    .list {
      grid-template-columns: repeat(1, 1fr);
    }
    .subcategory-list {
      font-size: 14px;
      margin-bottom: 50px;
    }
  }
  @media screen and (min-width: 501px) and (max-width: 768px) {
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
    .list {
      grid-template-columns: repeat(4, 1fr);
    }

    padding: 0 50px;
  }
`;
