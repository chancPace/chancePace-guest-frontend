import styled from 'styled-components';

export const PaymentStyled = styled.div`
  padding: 40px;
  > div {
    margin-bottom: 30px;
  }
  .reservation-space {
    .reservation-space-info {
      display: flex;
      > .img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        margin-right: 20px;
        img {
          border-radius: 8px;
          width: 100%;
        }
      }
    }
  }
  .reservation-title {
    font-size: 25px;
    border-bottom: 1px solid lightgray;
    margin-bottom: 20px;
  }
  .reservation-text {
    line-height: 2;
  }
  .ant-select {
    width: 300px;
  }
`;
