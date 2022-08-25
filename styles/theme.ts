import { css, DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    pink: '#FF5CFF',
    purple: ['#7544FF', '#6821D5', '#6215C6'],
    turquoise: '#26D6FF',
    white: '#fff',
    error: '#fc5c65',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 42, 48, 80, 96],
  breakpoints: ['40em', '52em', '64em', '80em'],
  radii: [0, 2, 4, 16, 9999, '100%'],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },

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
  transition: '0.3s ease-in-out',
  shadow: '0px 0px 8px 0px',
}

theme.breakpoints.sm = theme.breakpoints[0]
theme.breakpoints.md = theme.breakpoints[1]
theme.breakpoints.lg = theme.breakpoints[2]
theme.breakpoints.xl = theme.breakpoints[3]

theme.fontSizes.xs = theme.fontSizes[0]
theme.fontSizes.sm = theme.fontSizes[1]
theme.fontSizes.md = theme.fontSizes[2]
theme.fontSizes.lg = theme.fontSizes[3]
theme.fontSizes.xl = theme.fontSizes[4]
theme.fontSizes['2xl'] = theme.fontSizes[5]
theme.fontSizes['3xl'] = theme.fontSizes[6]
theme.fontSizes['4xl'] = theme.fontSizes[7]
theme.fontSizes['5xl'] = theme.fontSizes[8]
