import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200&display=swap');

    * {
        box-sizing: border-box;
        user-select: none;
    }

    body {
        background: linear-gradient(135deg, #002155, #0156AD);
        font-family: 'Source Code Pro', monospace;
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;
