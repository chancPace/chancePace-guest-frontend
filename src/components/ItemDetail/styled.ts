import styled from 'styled-components';

export const ItemDetailStyled = styled.div`
  padding: 0 10px;
  margin: auto;
  position: relative;
  max-width: 1280px;
  .ant-anchor-link-active,
  .ant-anchor-link-title {
    color: ${({ theme }) => theme.color.main} !important;
  }
  .ant-anchor-ink {
    background-color: ${({ theme }) => theme.color.main} !important;
  }
  .ant-anchor-ink-visible {
    background-color: ${({ theme }) => theme.color.main} !important;
  }
  .detail-top {
    border-bottom: 1px solid lightgray;
    padding-bottom: 20px;
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
          width: 70px;
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
    .detail-info {
      .anchor-sections {
        #part-1,
        #part-2,
        #part-3 {
          padding: 5px 0;
        }
        #part-3 {
          .ant-pagination {
            display: flex;
            justify-content: center;
          }
        }
        .anchor-title {
          .ant-anchor {
            background-color: white;
            height: 50px;
            align-items: center;
          }
        }
        > div {
          .section {
            margin: 20px 0;
            .section-title {
              display: inline-block;
              color: gray;
              font-size: 17px;
              margin-bottom: 5px;
              border-radius: 8px;
            }
            > p:nth-of-type(2) {
              font-size: 14px;
            }
            .map {
              width: 100%;
              height: 200px;
              .location-text {
                margin-top: 5px;
                font-size: 14px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .payment-section {
    .payment-title {
      font-size: 20px;
      margin-bottom: 10px;
      text-align: center;
    }
  }
  /* @media screen and (max-width: 480px) {
  } */
  @media screen and (max-width: 1024px) {
    .detail-top {
      .detail-top-text {
        .space-title {
          .space-name {
            font-size: 22px;
          }
          .space-location {
            font-size: 14px;
          }
          .rate {
            display: flex;
            justify-content: space-between;
            width: 60px;
            padding: 4px 6px;
            background-color: #fec01f;
            border-radius: 30px;
            font-size: 12px;
          }
        }
        .space-price {
          margin-top: 20px;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .detail-bottom {
      .detail-info {
        display: block;
        .anchor-sections {
          width: 100%;
          .anchor-title {
            .ant-anchor {
              height: 40px;
            }
          }
        }
        .payment-section {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
  @media screen and (min-width: 1025px) {
    padding: 0 50px;
    .detail-info {
      display: flex;
      gap: 10%;
      position: relative;
      .anchor-sections {
        width: 60%;
      }
      .payment-section {
        width: 30%;
        position: sticky;
        top: 70px;
        height: 370px;
      }
    }
  }
`;
