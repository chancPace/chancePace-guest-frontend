import styled from 'styled-components';

export const ItemDetailStyled = styled.div`
  width: 95%;
  margin: auto;
  position: relative;
  .spaceTitle {
    margin: 20px 0;
    > p {
      margin-bottom: 10px;
    }
  }
  .rate {
    display: flex;
  }
  .detailBottom {
    display: flex;
    justify-content: space-between;
    height: 800px;
    width: 100%;

    .tabWrap {
      width: 60%;
      .tab {
        > p {
          margin-bottom: 10px;
        }
        .map {
          width: 100%;
          height: 250px;
        }
        .detail-title {
          font-weight: bold;
        }
      }
    }
    .paymentSection {
      width: 30%;
      position: sticky;
      top: 70px;
      right: 0%;
      align-self: flex-start;
      justify-content: flex-end;
    }
  }
`;
