import styled from 'styled-components';

export const MyPageStyled = styled.div`
  padding: 50px 20px;
  margin-bottom: 200px;

  .user-info {
    text-align: center;
  }
  .my-booking {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logout {
    width: 96.45px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  .wish {
    .wish-list {
      .img-box {
        width: 100px;
        height: 100px;
        object-fit: cover;
        img {
          width: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
  }
  @media screen and (min-width: 1025px) {
  }
`;
