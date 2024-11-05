import styled from 'styled-components';

export const EditUserStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;
