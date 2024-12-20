import styled from 'styled-components';

export const SignupFormStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 450px;
    margin: auto;
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 100;
    border: 1px solid lightgray;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    .ant-input-password {
      border: 0;
      border-bottom: 1px solid lightgray;
      border-radius: 0;
    }
    .authentication-form {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      .ant-input {
        width: 80%;
        border: 0;
        border-bottom: 1px solid lightgray;
        border-radius: 0;
      }
      .ant-btn {
        width: 20%;
      }
    }

    .email-confirm {
      width: 262px;
      margin: 0;
    }
    .number-confirm {
      margin-bottom: 20px;
    }
    .signup-button {
      color: white;
      width: 100%;
      background-color: ${({ theme }) => theme.color.main};
    }
    .formLogo {
      width: 100%;
      height: auto;
      margin-bottom: 40px;
    }
  }
  .styled__CheckboxGroupStyled-sc-1ff6502c-0 {
    margin-top: 20px;
  }

  @media screen and (max-width: 480px) {
    .form {
      padding: 10px;
      width: auto;
      width: 320px;
      .email-confirm {
        margin: 0;
        display: inline;
      }
      .number-confirm {
        margin-bottom: 10px;
      }
      .signup-button {
        width: 100%;
      }
    }
  }
`;
