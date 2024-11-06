import styled from 'styled-components';

export const ReviewListStyled = styled.div`
  border-top: 1px solid #f1f3f5;
  border-bottom: 1px solid #f1f3f5;
  padding: 20px 0;
  width: 70%;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
      border-radius: 100%;
      object-fit: cover;
      display: flex;
      align-items: center;
      > img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }
  }

  .bottom {
    margin-bottom: 10px;
  }
`;
