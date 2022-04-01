import { css, DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  fonts: {
    OswaldLight: css`
      font-family: 'Oswald', sans-serif;
      font-weight: 300;
    `,
    OswaldRegular: css`
      font-family: 'Oswald', sans-serif;
      font-weight: 400;
    `,
    OswaldMedium: css`
      font-family: 'Oswald', sans-serif;
      font-weight: 500;
    `,

    OswaldBold: css`
      font-family: 'Oswald', sans-serif;
      font-weight: 700;
    `,

    PlayRegular: css`
      font-family: 'Play', sans-serif;
      font-weight: 400;
    `,

    PlayBold: css`
      font-family: 'Play', sans-serif;
      font-weight: 700;
    `,
  },
  palette: {
    primary: '#6b22d0',
    bg: {
      primary: '#131313',
      secondary: '#303133',
    },
    text: {
      primary: '#fff',
      secondary: '#9b9b9b',
    },
    error: '#fc5c65',
    success: '',
  },
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  transition: '0.3s ease-in-out',
  shadow: '0px 0px 8px 0px',
}
