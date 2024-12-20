import styled from 'styled-components';

export const CategoryStyled = styled.div`
  @font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  background-color: #363636;
  font-family: 'TheJamsil5Bold';
  font-weight: bold;
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  padding: 5px 15px;
  margin-bottom: 5px;
  line-height: 2;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  color: white;
  > p {
    white-space: nowrap;
  }
  img {
    filter: grayscale(0.5);
  }
`;
