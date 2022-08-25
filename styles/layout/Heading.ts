import { space, SpaceProps, system, TypographyProps, variant } from 'styled-system'
import styled from 'styled-components'
import { typography } from 'styled-system'

interface HeadingProps {
  line?: 'left' | 'right' | 'bottom'
  variant?: 'default' | 'background'
}

const Heading = styled('h1')<HeadingProps & TypographyProps & SpaceProps>(
  variant({
    variants: {
      default: {
        fontSize: '3xl',
        display: 'inline-flex',
        alignItems: 'center',
        '-webkit-text-stroke-width': '0.7px',
        '-webkit-text-stroke-color': '#fe43fd',
        '-webkit-text-fill-color': '#fff',
        '&::before, &::after': {
          display: 'block',
          width: '100px',
          height: '3px',
          background: '#FE43FD',
        },
      },
      background: {
        fontSize: '150px',
        '-webkit-text-stroke-width': '0.5px',
        '-webkit-text-stroke-color': '#FE43FD',
        '-webkit-text-fill-color': 'transparent',
        opacity: 0.2,
        whiteSpace: 'nowrap',
      },
    },
  }),
  variant({
    prop: 'line',
    variants: {
      right: {
        '&::after': {
          content: '""',
          ml: 4,
        },
        '@media (max-width: 40em)': {
          flexDirection: 'column',
          '&::after': {
            margin: '20px auto 20px auto',
          },
        },
      },
      bottom: {
        flexDirection: 'column',
        '&::after': {
          content: '""',
          margin: '20px auto 20px auto',
        },
      },
    },
  }),
  typography,
  space
)

Heading.defaultProps = {
  variant: 'default',
}

export default Heading
