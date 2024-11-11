import styled from 'styled-components';

export const MyPageStyled = styled.div`
  padding: 0 10px;
  height: 1000px;
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
    .my-booking-board {
      padding: 30px 10px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      text-align: center;
      .my-booking-board-title {
        margin-right: 15px;
        margin-bottom: 5px;
      }
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
      margin-bottom: 20px;
    }
    .review-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .wish {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    cursor: pointer;
    .img-box {
      width: 100px;
      height: 100px;
      object-fit: cover;
      img {
        width: 100%;
      }
    }

    .no-wish {
      text-align: center;
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
  .pagenation {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
  }
  @media screen and (min-width: 1025px) {
    padding: 50px 50px;
  }
`;
