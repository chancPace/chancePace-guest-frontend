import styled from 'styled-components';

export const HostInfoStyled = styled.div`
  text-align: center;
  /* background-color: orange; */
  .hostInfoImg {
    width: 300px;
    height: 250px;
    border-radius: 30px;
    margin-bottom: 5px;
    object-fit: cover;
  }

  .hostTitle {
    text-align: center;
    margin: 10px auto;
    width: 250px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
  }
  .hostText {
    width: 250px;
    margin: auto;
    text-align: center;
    line-height: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  .procedure {
    padding: 20px;
    width: 300px;
    height: 300px;
    border-radius: 20px;
    margin: 0 auto;
    .procedureTitle {
      display: flex;
      align-items: center;
      margin: 20px 0;
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: bold;
      .procedureImg {
        width: 50px;
      }
      span {
        color: ${({ theme }) => theme.color.main};
        margin-right: 15px;
      }
    }
    .procedureText {
      text-align: left;
      line-height: 1.5rem;
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
  }

  @media screen and (max-width: 480px) {
    .hostInfoImg {
      width: 90%;
    }
    .hostText {
      margin-bottom: 5px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    .hostInfoImg {
      width: 90%;
    }
    .hostText {
      margin-bottom: 5px;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    /* margin: 50px 0; */
  }
  @media screen and (min-width: 1025px) {
    /* margin: 50px 0; */
  }
`;
