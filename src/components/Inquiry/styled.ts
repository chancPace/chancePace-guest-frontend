import styled from 'styled-components';

export const InquiryStyled = styled.div`
  padding: 50px 10px;
  max-width: 1280px;
  margin: 0px auto;

  .conect {
    width: 100%;
    text-align: left;
    font-size: 80px;
    font-weight: bolder;
    margin-bottom: 40px;
  }
  .wrapBox {
    display: flex;
    .left {
      margin-right: 20px;
      width: 50%;
      .inputBox {
        margin-bottom: 10px;
        .ant-input {
          height: 35px;
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
        height: 35px;
        margin-top: 20px;
        width: 100%;
      }
    }
    .right {
      width: 50%;
      height: 480px;
      position: relative;
      #__react-kakao-maps-sdk___Map {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100% !important;
        height: 100% !important;
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
        height: 300px;
        width: 100%;
        #__react-kakao-maps-sdk___Map {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
`;
