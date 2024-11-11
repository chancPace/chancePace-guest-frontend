import styled from 'styled-components';

export const HostInfoStyled = styled.div`
  text-align: center;
  .hostInfoImg {
    width: 100%;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
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
      height: 150px;
    }
    .host-text {
      margin-bottom: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
    .hostSection {
      position: relative;
    }
    .procedure {
      padding: 5px;
      .procedureTitle {
        margin: 5px 0;
      }
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1024px) {
    .hostInfoImg {
      width: 90%;
      height: 150px;
    }
    .host-text {
      margin-bottom: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
    .hostSection {
      position: relative;
    }
  }
`;
