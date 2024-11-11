import styled from 'styled-components';

export const ReviewListStyled = styled.div`
  padding: 10px 10px;
  width: 90%;
  /* box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.23922); */
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  margin-bottom: 15px;
  .top {
    display: flex;
    align-items: start;
    justify-content: space-between;
    .top-left {
      border-radius: 100%;
      object-fit: cover;
      display: flex;
      align-items: center;
      > img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin-right: 15px;
      }
      .ant-rate {
        .ant-rate-star {
          margin-inline-end: 2px;
        }
      }
    }
    .top-right {
      .delete {
        background-color: #f7f7f7f7;
        border-radius: 30px;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }

  .bottom {
    margin-top: 10px;
  }
`;
