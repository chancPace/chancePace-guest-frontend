import styled from 'styled-components';

export const ReviewModalStyled = styled.div`
  .space-info {
    display: flex;
    align-items: center;
    .space-img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      object-fit: cover;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .ant-input {
    resize: none;
    margin: 10px 0;
  }
  .rating {
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
    }
    .ant-rate-star {
      margin-inline-end: -3px;
    }
  }
`;
