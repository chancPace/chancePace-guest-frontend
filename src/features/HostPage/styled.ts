import styled from 'styled-components';
import together from '../../assets/image/together.jpg';
export const HostStyled = styled.div`
  /* padding: 0 10px; */
  /* padding: 0 !important; */
  .section {
    padding-top: 60px;
    overflow: hidden;
    .hostMain {
      overflow: hidden;
      height: 100%;
      position: relative;
      .mainImg {
        width: 100%;
        height: 100%;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        object-fit: cover;
        border-radius: 15px;
        > img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 15px;
        }
      }
      .mainTitle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 3%;
        color: white;
        font-size: 100px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
      }
    }
  }
  .section {
    .explanation {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .infoTitle.ko {
        font-size: 40px;
        margin-bottom: 10px;
      }
      .infoTitle.en {
        font-size: 20px;
        color: gray;
      }
      .hostInfo {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(3, 1fr);
        background-color: white;
        padding: 30px 20px;
        border-radius: 20px;
      }
    }
  }
  .section {
    .procedure-list {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .procedureMainTitle {
        font-size: 25px;
        padding: 8px;
      }
      .hostProcedure {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  .section {
    .together {
      background-color: gray;
      height: 100%;
      padding-top: 60px;
      background-image: url(${together.src});
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .go {
      color: white;
      > p {
        font-size: 80px;
        text-align: center;
      }
      .host-button {
        margin-top: 10px;
        font-size: 18px;

        > a {
          padding: 15px;
          background-color: black;
        }
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 689px) {
    .section {
      .hostMain {
        .mainImg {
          grid-template-columns: repeat(1, 1fr);
        }
        .mainTitle {
          font-size: 60px;
        }
      }
    }
    .section {
      .procedure-list {
        .hostProcedure {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
        }
        .procedureMainTitle {
          font-size: 20px;
        }
      }
    }
    .section {
      .explanation {
        .infoTitle.ko {
          font-size: 25px;
        }
        .hostInfo {
          width: 100%;
          gap: 1px;
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
    .section {
      .go {
        > p {
          font-size: 50px;
        }
        .host-button {
          font-size: 15px;
        }
      }
    }
  }

  @media screen and (min-width: 690px) and (max-width: 1024px) {
    .section {
      .hostMain {
        .mainImg {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
    .section {
      .explanation {
        .hostInfo {
          width: 100%;
          gap: 1px;
          grid-template-columns: repeat(1, 1fr);
          font-size: 50px;
        }
      }
    }
    .section {
      .procedure-list {
        .hostProcedure {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
`;
