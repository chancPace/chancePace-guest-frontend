import styled from 'styled-components';

export const EditUserStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .form {
    .error {
      height: 25px;
      display: flex;
      align-items: center;
      /* background-color: green; */
      font-size: 12px;
      color: ${({ theme }) => theme.color.warning};
    }
  }
  .confirm {
    display: block;
  }
  .button {
    margin-top: 20px;
    background-color: #8c73d8;
  }
  .ant-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-collapse {
    width: 350px;
    text-align: left;
    font-weight: bold;
    border: 0;
    .ant-collapse-item {
      background-color: white;
      border-radius: 0;
      .ant-form-item-control-input {
        width: 350px;
      }
    }
  }
`;
