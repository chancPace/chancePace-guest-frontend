import styled from 'styled-components';

export const MyPageStyled = styled.div`
  padding: 50px 20px;
  margin-bottom: 200px;

  .user-info {
    text-align: center;
    .user-info-top {
      margin-bottom: 30px;
      .user-img {
        margin: auto;
        width: 120px;
        height: 120px;
        background-color: gray;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }
  }
  .my-booking {
    display: flex;
    flex-direction: column;
    align-items: center;
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
