import styled from 'styled-components';

export const EditUserStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .confirm {
    display: block;
  }
  label {
    font-size: 12px;
    display: block;
    margin: 5px 0 5px 0;
  }
  .ant-input-password,
  .ant-input,
  .ant-collapse {
    width: 400px;
  }
  .ant-collapse {
    width: 450px;
    text-align: left;
    font-weight: bold;
    border: 0;
    .ant-collapse-content-box {
      display: flex;
      justify-content: center;
    }
    .ant-collapse-item {
      background-color: white;
      border-radius: 0;
      .ant-form-item-control-input {
        width: 350px;
      }
    }
  }
`;
