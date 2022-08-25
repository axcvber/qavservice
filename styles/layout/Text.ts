import { variant } from 'styled-system'
import styled, { css } from 'styled-components'
import { typography, color, space, SpaceProps, ColorProps, TypographyProps } from 'styled-system'

interface TextProps {
  variant?: 'default' | 'link'
  gradientFrom?: string
  gradientTo?: string
}
const Text = styled.p<TextProps & SpaceProps & ColorProps & TypographyProps>(({ gradientFrom, gradientTo, color }) => {
  return css`
    line-height: 2.2;
    letter-spacing: 1px;
    display: inline-block;
    background-color: ${gradientFrom};
    background-image: linear-gradient(45deg, ${gradientFrom || color}, ${gradientTo || color});
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;

    ${variant({
      variants: {
        default: {
          color: 'white',
        },
        link: {
          cursor: 'pointer',
          position: 'relative',
          userSelect: 'none',
          fontWeight: 500,
          fontSize: 'lg',
          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: '2px',
            left: 0,
            background: `linear-gradient(90deg, ${gradientFrom || color} 0%, ${gradientTo || color} 71%)`,
            pointerEvents: 'none',
            transform: 'scaleX(0)',
            transformOrigin: 'bottom right',
            transition: 'transform 0.3s',
          },
          '&:hover, &.active': {
            color: '#fff',
            '&::after': {
              transformOrigin: 'bottom left',
              transform: 'scaleX(1)',
            },
          },
        },
      },
    })};
    ${typography};
    ${color};
    ${space};
  `
})

Text.defaultProps = {
  variant: 'default',
  color: '#fff',
}

export default Text
