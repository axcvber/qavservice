import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      pink: string
      purple: Array<string>
      turquoise: string
      white: string
      error: string
    }
    space: any

    fontSizes: any
    breakpoints: any
    radii: any
    lineHeights: any

    fonts: {
      OswaldLight: FlattenSimpleInterpolation
      OswaldRegular: FlattenSimpleInterpolation
      OswaldMedium: FlattenSimpleInterpolation
      OswaldBold: FlattenSimpleInterpolation
      PlayRegular: FlattenSimpleInterpolation
      PlayBold: FlattenSimpleInterpolation
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
    line: any
  }
}
