import styled from 'styled-components';

export const FindPasswordStyled = styled.div`
  /* margin-top: 65px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .logo {
    font-size: 60px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  form {
    width: 350px;
    padding: 30px 10px;
    .input-box {
      margin-bottom: 10px;
      .ant-input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid lightgray;
        border-radius: 0;
      }
      .ant-btn {
        width: 100%;
        margin-top: 10px;
      }
    }
    .new-password {
      > div {
        .ant-input {
          margin-bottom: 10px;
        }
      }
      .ant-btn {
        width: 100%;
      }
    }
  }
`;
