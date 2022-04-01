import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
${normalize}

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
  background-color: ${({ theme }) => theme.palette.bg.primary};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1) inset;
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.palette.primary};
  border-radius: 8px;
  border: 3.5px solid ${({ theme }) => theme.palette.bg.primary};;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #7a3ed0;
}


body { 
  ${({ theme }) => theme.fonts.OswaldRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  background-color: #000;
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
`
