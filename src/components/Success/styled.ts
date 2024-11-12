import styled from 'styled-components';

export const SuccessStyled = styled.div`
  height: 100vh;

  position: relative;
  .success {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    width: 400px;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 20px;
    > div:first-child {
      font-size: 23px;
      text-align: center;
      margin-bottom: 10px;
    }
    .booking-info {
      .img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        margin-right: 20px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .text {
        > p {
          font-size: 14px;
          line-height: 1.8;
          display: flex;
          > span {
            color: gray;
            width: 70px;
            display: block;
          }
        }
      }
    }
    .home-btn {
      border: 0;
      padding: 5px 10px;
      background-color: inherit;
      display: block;
      text-align: center;
      background-color: lightgray;
      margin: auto;
      margin-top: 15px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 480px) {
    .success {
      width: 300px;
    }
  }
`;
