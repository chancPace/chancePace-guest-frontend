import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    a {
    color: inherit;
    text-decoration: none;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    .ant-message {
    z-index: 9000000 !important; 
    
  }
}
.error {
      height: 18px;
      display: flex;
      align-items: center;
      font-size: 10px;
      color: ${({ theme }) => theme.color.warning};
      text-align: left;
      /* background-color: green; */
      width: 350px;
    }
    @media screen and (max-width: 550px) {
      .error {width:250px;}
    }
`;

export default GlobalStyle;
