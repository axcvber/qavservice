import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
${normalize}

@font-face {
  font-family: 'Batman Forever Alternate Cyr';
  src: url("/fonts/batmanforeveralternatecyr.ttf");
  font-display: swap;
}

* {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.colors.purple[0]};
}

::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.colors.turquoise};
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.colors.purple[0]};
}

body { 
  font-family: "Batman Forever Alternate Cyr", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  background-color: #7F43FF;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
a {
  text-decoration: none;
}

video {
  max-width: 100%;
  height: auto;
}

button {
  border: none;
  outline: none;
  line-height: 1;
}

`
