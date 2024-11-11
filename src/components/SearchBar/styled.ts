import styled from 'styled-components';

export const SearchBarStyled = styled.div`
  width: 100%;
  text-align: center;
  .custom-InputSearch {
    width: 60%;
    max-width: 600px;
  }
  @media screen and (max-width: 689px) {
    .custom-InputSearch {
      width: 100%;
    }
  }
`;
