import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root{
        --color-primary: #FF577F;
        --color-primary-focus: #FF427F;
        --color-primary-negative: #E83F5B;
        --color-primary-disable: #59323F;
        --color-grey-4: #121214;
        --color-grey-3: #212529;
        --color-grey-2: #343B41;
        --color-grey-1: #868E96;
        --color-grey-0: #F8F9FA
    }

    html, body{
        width: 100%;
        height: 100vh;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, a, img, ol, ul, li, form, label, article, aside, figure, figcaption, footer, header, nav, section, main, button, input  {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, figcaption, figure, 
    footer, header, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote{
        quotes: none;
    }
    blockquote:before, blockquote:after{
        content: '';
        content: none;
    }
    button{
        cursor: pointer;
    }
`

export default GlobalStyle