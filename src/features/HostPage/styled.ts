import styled from 'styled-components';

export const HostStyled = styled.div`
  background-color: white;
  width: 100%;
  padding: 10px;
  .hostMain {
    background-color: white;
    width: 100%;
    text-align: center;
    @keyframes colorChange {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .mainImg {
    width: 100%;
    position: relative;
    display: grid;
    gap: 10px;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    img {
      width: 100%;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
    .mainTitle {
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translate(-10%, -50%);
      color: white;
      mix-blend-mode: normal; /* 텍스트가 배경에 따라 색이 바뀜 */
      font-weight: bold;
      span {
        display: inline-block;
        opacity: 0;
        animation: colorChange 0.1s forwards;
        animation-delay: calc(0.1s * var(--i)); /* 각 글자에 지연 시간 적용 */
        color: white;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8); /* Reduced shadow blur, increased opacity */
      }
    }
  }

  .infoTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin-left: 100px;
  }
  .en {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: gray;
    text-transform: uppercase;
  }
  .hostInfo {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
  }
  .procedureTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: bold;
    text-align: left;
    margin-left: 100px;
    margin-bottom: 20px;
  }
  .hostProcedure {
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.5);
  }
  .go {
    margin: 100px 0 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    flex-direction: column;

    .hostButton {
      padding: 20px 50px;
      margin-left: 20px;
    }
  }

  @media screen and (max-width: 480px) {
    .infoTitle {
      text-align: center;
      margin: 20px;
    }
    .hostInfo {
      flex-direction: column;
      align-items: center;
    }
    .mainImg {
      grid-template-columns: repeat(2, 1fr);

      .mainTitle {
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }
    }
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    .infoTitle {
      text-align: center;
      margin: 20px;
    }
    .hostInfo {
      flex-direction: column;
      align-items: center;
    }
    .hostProcedure {
      flex-direction: column;
      text-align: center;
    }
    .mainImg {
      grid-template-columns: repeat(2, 1fr);
      img {
        /* width: 80%; */
        height: 200px;
      }
      .mainTitle {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
      }
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .mainTitle {
      font-size: ${({ theme }) => theme.fontSizes.big};
    }
  }
  @media screen and (min-width: 1025px) {
    .mainTitle {
      font-size: ${({ theme }) => theme.fontSizes.big};
    }
  }
`;
