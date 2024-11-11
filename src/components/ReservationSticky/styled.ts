import styled from 'styled-components';

export const ReservationStickyStyled = styled.div`
  margin-bottom: 10px;
  border-radius: 15px;
  text-align: center;
  padding: 10px;
  position: relative;
  border: 1px solid lightgray;
  .space-price {
    font-size: 14px;
  }
  .people-info {
    display: flex;
    flex-direction: column;
    align-items: start;
    .people-number-title {
      text-align: left;
    }
    .people-number {
      margin: 10px auto;

      > .ant-input.people-input {
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
      > p {
        font-size: 11px;
        color: ${({ theme }) => theme.color.warning};
        margin-top: 5px;
        text-align: left;
      }
    }
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
    cursor: pointer;
    width: 90%;
    background-color: ${({ theme }) => theme.color.main};
    border-radius: 15px;
    color: white;
    margin-top: 20px;
  }
`;
