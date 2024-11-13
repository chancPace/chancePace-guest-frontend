import styled from 'styled-components';

export const InquiryStyled = styled.div`
  padding: 50px 10px;
  max-width: 1280px;
  margin: 60px auto;

  .wrapBox {
    display: flex;
    justify-content: space-between;
    .left {
      box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.2); /* 적당한 그림자 */
      padding: 20px;
      margin-right: 20px;
      width: 45%;
      transition: 0.3s;
      &:hover {
        box-shadow: 2px 10px 18px rgba(0, 0, 0, 0.4); /* 더 진하고 깊은 그림자 */
        transition: 0.5s;
      }
      > p {
        &:first-child {
          font-size: 25px;
          text-align: center;
        }
        &:nth-of-type(2) {
          font-size: 15px;
          text-align: center;
          color: gray;
          margin-bottom: 20px;
        }
      }
      .inputBox {
        margin-bottom: 10px;
        .ant-input {
          height: 35px;
          border: 0;
          border-bottom: 1px solid lightgray;
          border-radius: 0;
        }
        .content {
          height: 150px;
          resize: none;
          border: 1px solid lightgray !important;
          border-radius: 8px !important;
        }
        .title {
          margin-bottom: 5px;
          font-size: 15px;
          font-weight: 600;
        }
      }
      .ant-btn {
        height: 35px;
        margin-top: 20px;
        width: 100%;
      }
    }
    .right {
      width: 50%;
      height: 480px;
      .conect {
        width: 100%;
        text-align: left;
        font-size: 40px;
        font-weight: bolder;
        margin-bottom: 20px;
      }
      .right-section {
        position: relative;
        width: 100%;
        height: 100%;
        .map {
          width: 100%;
          height: 50%;
          > p:first-child {
            font-size: 18px;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 5px;
            > span {
              margin-right: 10px;
              color: ${({ theme }) => theme.color.main};
            }
          }
          > p:nth-of-type(2) {
            font-size: 14px;
            margin-bottom: 5px;
          }
          #__react-kakao-maps-sdk___Map {
            width: 100% !important;
            height: 80% !important;
            margin-bottom: 10px;
          }
        }
        .company-info {
          width: 100%;
          height: 50%;
          > div {
            margin: 10px 0 20px 0;
            > p:first-child {
              font-size: 18px;
              align-items: center;
              justify-content: flex-start;
              margin-bottom: 5px;
              > span {
                margin-right: 10px;
                color: ${({ theme }) => theme.color.main};
              }
            }
            > p:nth-of-type(2) {
              font-size: 14px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 800px) {
    .wrapBox {
      display: block;
      .left {
        width: 100%;
        margin: 0px !important;
        .inputBox {
          .ant-input {
            height: 30px;
          }
          .content {
            height: 200px;
            resize: none;
          }
          .title {
            margin-bottom: 5px;
            font-size: 15px;
            font-weight: 600;
          }
        }
        .ant-btn {
          height: 30px;
        }
      }
      .right {
        margin-top: 30px;
        width: 100%;
        #__react-kakao-maps-sdk___Map {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
`;
