import styled from 'styled-components';

export const MyBookingStyled = styled.div`
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.23922);
  .booking-date {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    .view-button {
      cursor: pointer;
    }
    > p:last-child {
      cursor: pointer;
    }
  }
  .booking-data {
    display: flex;
    position: relative;
    cursor: pointer;
    .booking-space-img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      object-fit: cover;
      border-radius: 8px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
    .booking-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      > div {
        margin-bottom: 5px;
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
        padding: 3px 8px;
        border-radius: 15px;
        border: 1px solid gray;
        font-size: 13px;
      }
    }
  }
`;
