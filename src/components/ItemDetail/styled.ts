import styled from 'styled-components';

export const ItemDetailStyled = styled.div`
  padding: 60px 50px 0 50px;
  margin: auto;
  position: relative;
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
    .detail-info {
      .anchor-sections {
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
            .map {
              width: 100%;
              height: 200px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
  }
  @media screen and (min-width: 481px) and (max-width: 1024px) {
    .detail-info {
      display: block;
      .anchor-sections {
        width: 100%;
      }
      .payment-section {
        width: 80%;
        margin: auto;
      }
    }
  }
  @media screen and (min-width: 1025px) {
    .detail-info {
      display: flex;
      gap: 200px;
      position: relative;
      .anchor-sections {
        width: 70%;
      }
      .payment-section {
        width: 30%;
        position: sticky;
        top: 60px;
        height: 370px;
      }
    }
  }
`;
