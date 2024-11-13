import styled from 'styled-components';

export const PaymentStyled = styled.div`
  padding: 10px 10px;
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
      font-size: 12px;
      margin-bottom: 30px;
      .modal-button {
        display: inline-block;
        margin-top: 10px;
        cursor: pointer;
        border-bottom: 1px solid gray;
        color: gray;
      }
    }
    .ant-select {
      width: 300px;
      margin-bottom: 30px;
    }

    #payment-widget {
      margin-left: -30px !important;
    }
  }

  .payment-right {
    width: 30%;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 8px;
    height: 550px;
    font-size: 15px;
    .reservation-space {
      display: flex;
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
      .reservation-space-text {
        width: 100%;
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
    }
    .reservation-agreement {
      margin-top: 20px;
      font-size: 15px;
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
      font-size: 15px;
      margin-top: 20px;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    .payment-left {
      width: 100%;
      .ant-select {
        width: 80%;
      }
    }
    .payment-right {
      width: 100%;
      height: 340px;
      .reservation-space {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        > .img {
          width: 30%;
          height: 120px;
          object-fit: cover;
          margin-right: 20px;
          > img {
            border-radius: 8px;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  @media screen and (min-width: 901px) {
    padding: 10px 50px;
    .payment-right {
      width: 30%;
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 8px;
      height: 550px;
      .reservation-space {
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;
