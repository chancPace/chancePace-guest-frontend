import styled from 'styled-components';

export const BookingDetailStyled = styled.div`
  width: 500px;
  padding: 10px;
  margin: auto;
  .booking-detail {
    h1 {
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .button-box {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
    button {
      cursor: pointer;
      border: 0;
      padding: 0;
      background-color: inherit;
      padding: 10px 15px;
      border: 1px solid lightgray;
    }
  }
`;
