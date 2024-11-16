import styled from 'styled-components';

export const LoginStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .form {
    background-color: rgba(255, 255, 255, 0.8);
    width: 400px;
    margin: auto;
    padding: 50px;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
    display: flex;
    flex-direction: column;
    align-items: center;
    .ant-input-outlined {
      border: 0;
    }
    .ant-input {
      width: 350px;
      border: 0;
      border-bottom: 1px solid lightgray;
      border-radius: 0px;
      padding: 0;
    }
    .ant-input-password {
      padding: 0 !important;
      border-bottom: 1px solid lightgray;
      width: 350px;
      border: 0;
      border-radius: 0px;
    }
    .loginform-footer {
      width: 115%;
      span {
        font-size: 13px;
      }
      .span1 {
        display: block;
        margin-top: 10px;
      }
    }
    z-index: 10;
  }
  .formLogo {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    text-align: center;
    color: lightgray;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 550px) {
    .form {
      width: 300px;
      .ant-input,
      .ant-input-password {
        width: 250px;
      }
    }
    .formLogo {
      font-size: 40px;
    }
    .loginform-footer {
      span {
        font-size: 11px;
      }
    }
  }
`;
