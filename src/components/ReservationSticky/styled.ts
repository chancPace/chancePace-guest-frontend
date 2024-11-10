import styled from 'styled-components';

export const ReservationStickyStyled = styled.div`
  height: 300px;
  margin-bottom: 10px;
  background-color: pink;
  border: 1px solid lightgray;
  border-radius: 15px;
  text-align: center;
  padding: 10px;
  position: relative;
  .space-price {
    font-size: 14px;
  }
  .people-number {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    > .ant-input {
      margin: 0 10px;
    }
    .minus {
      border: 0;
    }
    .plus {
      border: 0;
    }
  }
  .people-number-info {
    font-size: 11px;
    color: ${({ theme }) => theme.color.warning};
    margin-top: 5px;
  }
  .react-datepicker-wrapper {
    width: 100%;
    .custom-datepicker {
      width: 100%;
    }
  }
  .pay-button {
    padding: 10px;
    border: 0;
    position: absolute;
    top: 98%;
    left: 50%;
    transform: translate(-50%, -98%);
    cursor: pointer;
    width: 90%;
    background-color: ${({ theme }) => theme.color.main};
    border-radius: 15px;
    color: white;
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
  }
  @media screen and (min-width: 1025px) {
    height: 500px;
  }
`;
