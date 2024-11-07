import styled from 'styled-components';

export const SignupFormStyled = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  position: relative;
  .form {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 450px;
    margin: auto;
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 100;
    border: 1px solid lightgray;
    .error {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      color: ${({ theme }) => theme.color.warning};
    }
  }
  .styled__CheckboxGroupStyled-sc-1ff6502c-0 {
    margin-top: 20px;
  }
  .formLogo {
    position: absolute;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -95%);
    font-size: ${({ theme }) => theme.fontSizes.big};
  }
`;
