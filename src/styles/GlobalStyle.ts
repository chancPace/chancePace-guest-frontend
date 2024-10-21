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
    padding-top: 70px;
}
`;

export default GlobalStyle;
