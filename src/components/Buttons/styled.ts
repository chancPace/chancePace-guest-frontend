import styled from 'styled-components';

export const ButtonsStyled = styled.div`
  margin-top: 10px;
  .customButton {
    width: 350px;
    background-color: ${({ theme }) => theme.color.main};
    &:hover {
      background-color: ${({ theme }) => theme.color.main} !important;
    }
  }
  @media screen and (max-width: 550px) {
    .customButton {
      width: 250px;
    }
  }
`;
