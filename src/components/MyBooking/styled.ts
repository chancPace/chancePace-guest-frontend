import styled from 'styled-components';

export const MyBookingStyled = styled.div`
  width: 70%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: lightgray;
  .booking-date {
    background-color: lightgrey;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid white;
    > p:last-child {
      cursor: pointer;
    }
  }
  .booking-data {
    display: flex;
    height: 100%;
    position: relative;
    cursor: pointer;
    .booking-space-img {
      width: 100px;
      height: 100px;
      background-color: aliceblue;
      margin-right: 10px;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .booking-info {
      height: 100%;
      /* width: calc(100% - 200px); */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      > div {
        margin-bottom: 10px;
      }
    }
    .review-btn-box {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: flex-end;
      .review-btn {
        padding: 5px 10px;
        border-radius: 15px;
        border: 1px solid gray;
      }
    }
  }
`;
