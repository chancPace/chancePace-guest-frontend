import styled from 'styled-components';

export const MyPageStyled = styled.div`
  padding: 50px 20px;
  margin-bottom: 200px;

  .user-info {
    text-align: center;
    .user-info-top {
      margin-bottom: 30px;
      .user-img {
        margin: auto;
        width: 120px;
        height: 120px;
        background-color: gray;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }
    .user-info-bottom {
      display: flex;
      justify-content: center;
      .ant-form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ant-collapse {
        width: 500px;
        text-align: left;
        font-weight: bold;
        border: 0;
        .ant-collapse-item {
          background-color: white;
          border-radius: 0;
          .ant-form-item-control-input {
            width: 450px;
          }
        }
      }
      .ant-form-item-control-input {
        width: 450px;
      }
      .ant-btn {
        background-color: black;
        display: flex;
        justify-content: center;
        width: 450px !important;
        color: white;
        margin-top: 10px;
      }
    }
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
