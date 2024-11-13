import styled from 'styled-components';

export const EditUserStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .confirm {
    display: block;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      width: 100%;
    }
  }
  label {
    font-size: 12px;
    display: block;
    margin: 5px 0 5px 0;
  }
  .ant-input-password,
  .ant-input,
  .ant-collapse {
    width: 350px;
  }
  .ant-select-selector {
    width: 350px !important;
  }
  .ant-collapse {
    width: 400px;
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
  .logout {
    width: 400px;
    cursor: pointer;
    margin-top: 10px;
  }
  @media screen and (max-width: 550px) {
    .ant-input-password,
    .ant-input,
    .ant-collapse {
      width: 250px;
    }
    .ant-select-selector {
      width: 250px !important;
    }
  }
`;
