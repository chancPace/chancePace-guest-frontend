import styled from 'styled-components';

export const ButtonsStyled = styled.div`
  margin-top: 10px;
  .customButton {
    width: 400px;
    background-color: ${({ theme }) => theme.color.main};
    &:hover {
      background-color: gray;
    }
  }
`;
