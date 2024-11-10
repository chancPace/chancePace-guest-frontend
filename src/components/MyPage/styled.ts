import styled from 'styled-components';

export const MyPageStyled = styled.div`
  padding: 50px 50px;
  margin-bottom: 200px;
  .ant-tabs {
    height: 100%;
  }

  .user-info {
    text-align: center;
  }
  .my-booking {
    display: flex;
    flex-direction: column;
    align-items: center;
    > p {
      width: 100%;
      text-align: left;
      font-size: 20px;
    }
    .my-booking-board {
      width: 100%;
      padding: 50px 10px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      text-align: center;
      .board-list {
        display: flex;
        align-items: center;
        margin: 0 20px;
        > p {
          margin-left: 5px;
          font-size: 18px;
        }
        .icon-box {
          width: 50px;
          height: 50px;
          font-size: 25px;
          background-color: ${({ theme }) => theme.color.main} !important;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: white;
        }
      }
    }
  }
  .my-review {
    .review-total {
      padding: 10px 0;
      font-size: 20px;
      border-bottom: 1px solid lightgray;
      margin-bottom: 20px;
    }
    .review-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .wish {
    .wish-list {
      .img-box {
        width: 100px;
        height: 100px;
        object-fit: cover;
        img {
          width: 100%;
        }
      }
    }
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.color.main} !important;
  }

  .ant-tabs-tab {
    &:hover {
      color: ${({ theme }) => theme.color.main};
    }
  }
  .ant-tabs-ink-bar {
    background-color: ${({ theme }) => theme.color.main};
  }
  .logout {
    width: 96.45px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
  }
  @media screen and (min-width: 1025px) {
  }
`;
