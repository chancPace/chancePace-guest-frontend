import styled from 'styled-components';

export const ItemDetailStyled = styled.div`
  padding: 0 50px;
  margin: auto;
  position: relative;
  .detail-top {
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .detail-top-text {
      display: flex;
      justify-content: space-between;
      .space-title {
        margin-top: 20px;
        .space-name {
          font-size: 25px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .space-location {
          color: #292929;
          font-size: 15px;
          margin-bottom: 5px;
        }
        .rate {
          display: flex;
          justify-content: space-between;
          width: 60px;
          padding: 5px 10px;
          background-color: #fec01f;
          border-radius: 30px;
          font-size: 14px;
        }
      }
      .space-price {
        margin-top: 20px;
        font-size: 25px;
        font-weight: bold;
      }
    }
  }
  .detail-bottom {
    position: relative;
    color: #121212;
    .anchor-title {
      top: 70px;
      width: 65%;
      position: sticky;
      background-color: white;
      z-index: 20;
    }
    .detail-info {
      position: relative;
    }
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .detail-info {
    }
  }

  @media screen and (min-width: 1025px) {
    .detail-info {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      .anchor-sections {
        width: 65%;
        .section {
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            margin-top: 20px;
          }
          .map {
            width: 90%;
            height: 200px;
          }
        }
      }
      .paymentSection {
        width: 30%;
        height: 500px;
        position: sticky;
        top: 100px;
      }
    }
  }
`;
