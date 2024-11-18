import styled from 'styled-components';

export const SearchBarStyled = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  .ant-input-affix-wrapper {
    border: 0 !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #363636 !important;
  }
  .ant-btn {
    color: #363636;
    font-size: 25px;
    &:hover {
      color: #363636 !important;
    }
  }
  .custom-InputSearch {
    width: 60%;
    max-width: 600px;
    border: 0 !important;
  }
  @media screen and (max-width: 689px) {
    .custom-InputSearch {
      width: 100%;
    }
  }
`;
