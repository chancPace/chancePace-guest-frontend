import styled from 'styled-components';

export const PaymentStyled = styled.div`
  padding: 40px;
  display: flex;
  gap: 20px;
  .payment-left {
    width: 70%;
    .reservation-title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .reservation-text {
      line-height: 2;
      font-size: 14px;
      margin-bottom: 20px;
      > p {
        display: flex;
        > span {
          color: gray;
          width: 60px;
          display: block;
        }
      }
    }
    .refund-information {
      font-size: 14px;
      margin-bottom: 30px;
      .modal-button {
        cursor: pointer;
        border-bottom: 1px solid gray;
      }
    }
    .ant-select {
      width: 300px;
      margin-bottom: 30px;
    }
    #__next {
      > div {
        .payment-widget-cache-yniek8 {
          padding: 0 !important;
        }
      }
    }
  }
  .payment-right {
    width: 30%;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 8px;
    .reservation-space {
      display: flex;
      flex-direction: column;
      align-items: center;
      > .img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        > img {
          border-radius: 8px;
          width: 100%;
          height: 100%;
        }
      }
      > p {
        width: 100%;
        line-height: 1.8;
        display: flex;
        font-size: 15px;
        > span {
          color: gray;
          width: 70px;
          display: block;
        }
      }
    }
    .reservation-agreement {
      margin-top: 20px;
      .agreement-title {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .reservation-pay {
        > p {
          line-height: 1.5;
          display: flex;
          justify-content: space-between;
          > span {
            color: gray;
          }
        }
      }
    }
    .pay-button {
      background-color: ${({ theme }) => theme.color.main};
      border: 0;
      width: 100%;
      padding: 10px;
      color: white;
      font-size: 16px;
      margin-top: 20px;
    }
  }
`;
