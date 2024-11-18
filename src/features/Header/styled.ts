import styled from 'styled-components';

export const HeaderStyled = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: white;
  z-index: 50;
  padding: 0 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin: auto;
  nav {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    .logo {
      text-align: left;
      font-size: ${({ theme }) => theme.fontSizes.xl};
      cursor: pointer;
    }
    .userBar {
      display: flex;
      align-items: center;
      .headerRight {
        display: flex;
        align-items: center;
        gap: 10px;
        .host {
          display: flex;
          gap: 10px;
        }
        p {
          cursor: pointer;
        }
        .hostMenuBar {
          padding: 10px;
          background-color: #8c73d8;
          color: white;
          border-radius: 8px;
          white-space: nowrap;
        }
        span {
          width: 30px;
          height: 70px;
          display: inline-block;
        }
        .header-icon {
          display: flex;
          align-items: center;
          height: 100%s;
          .icon {
            width: 25px;
            height: 70px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    nav {
      .userBar {
        .headerRight {
          .host {
            flex-direction: column;
            gap: 3px;
          }
          .hostMenuBar {
            padding: 3px 7px;
            text-align: center;
          }
        }
      }
    }

    font-size: 13px;
  }
  @media screen and (min-width: 1025px) {
    padding: 0 50px;
  }
`;
