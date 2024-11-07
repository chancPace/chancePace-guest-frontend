import styled from 'styled-components';

export const LoginStyled = styled.div`
  margin: auto;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  position: relative;
  .form {
    background-color: rgba(255, 255, 255, 0.8);
    width: 450px;
    margin: auto;
    padding: 50px;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid lightgray;
    .error {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      color: ${({ theme }) => theme.color.warning};
    }
    .span1 {
      display: block;
      margin-top: 10px;
    }
    z-index: 10;
  }
  .formLogo {
    position: absolute;
    left: 50%;
    top: 90%;
    transform: translate(-50%, -90%);
    font-size: ${({ theme }) => theme.fontSizes.big};
  }
`;
