import styled from 'styled-components';

export const BookingDetailStyled = styled.div`
  width: 450px;
  padding: 10px;
  margin: 80px auto;
  height: 100vh;
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
  @media screen and (max-width: 480px) {
    width: 370px;
    h1 {
      font-size: 25px;
    }
  }
`;
