import styled from 'styled-components';

export const ScrollToTopStyled = styled.div`
  > div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: white;
    color: gray;
    font-size: 13px;
    opacity: 0.8;
    overflow: hidden;
    cursor: pointer;
    &:last-child {
      border: 1px solid lightgray;
      margin-top: 10px;
    }
    > img {
      width: 130%;
      height: 130%;
      border-radius: 50%;
    }
  }
  position: fixed;
  bottom: 2%;
  right: 2%;
  z-index: 9000000;
`;
