import styled from 'styled-components';

export const FooterStyled = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: lightgray;
  color: white;
  padding: 10px 20px;

  .footer-sns {
    display: flex;
    justify-content: center;
    font-size: 25px;
    > a {
      margin: 0 10px;
    }
  }
  .footer1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px solid white;
    margin-bottom: 10px;
    > p {
      margin: 10px;
      cursor: pointer;
    }
  }
  .footer2 {
    display: flex;
    flex-wrap: wrap;
    > div {
      display: flex;
      margin-right: 5px;
      > p {
        margin-left: 5px;
        line-height: 1.4;
      }
    }
  }
  .footer3 {
    display: flex;
    flex-wrap: wrap;
    > p {
      margin-right: 10px;
      line-height: 1.4;
    }
  }
  .footer4 {
    margin-top: 20px;
    > p:nth-of-type(2) {
      margin: 5px 10px;
      cursor: pointer;
    }
  }
`;
