import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      OswaldLight: FlattenSimpleInterpolation
      OswaldRegular: FlattenSimpleInterpolation
      OswaldMedium: FlattenSimpleInterpolation
      OswaldBold: FlattenSimpleInterpolation
      PlayRegular: FlattenSimpleInterpolation
      PlayBold: FlattenSimpleInterpolation
    }
    palette: {
      primary: string
      bg: {
        primary: string
        secondary: string
      }
      text: {
        primary: string
        secondary: string
      }
      error: string
      success: string
    }
    breakpoints: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
    }
    transition: string
    shadow: string
  }
}
