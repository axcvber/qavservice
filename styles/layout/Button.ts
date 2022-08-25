import styled from 'styled-components'
import { space, SpaceProps, variant } from 'styled-system'

const Button = styled('button')<{ variant?: 'contained' | 'outlined' } & SpaceProps>(
  {
    fontSize: '16px',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    letterSpacing: '0.075em',
    padding: '.8em 1em',
    position: 'relative',
    alignSelf: 'center',
    textTransform: 'uppercase',
    border: '3px #00bcdd solid',
    borderImage: 'linear-gradient(45deg, #00bcdd 0%, #ff00ff 100%)',
    borderImageSlice: '1 1 0 0',
    zIndex: 1,
    boxShadow: '-0.5em .5em transparentize($slate-color,1)',
    transformOrigin: 'left bottom',
    transition: 'all 200ms ease-in-out',
    '&:before, &:after': {
      border: '3px #00bcdd solid',
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
    },
    '&:before': {
      borderImage: 'linear-gradient(45deg, #00bcdd 0%, adjust-hue(#00bcdd,10%) 100%)',
      borderImageSlice: '1 1 0 1',
      left: '-0.66em',
      top: '0.12em',
      width: '.33em',
      height: '38px',
      transform: 'skewY(-45deg)',
    },
    '&:after': {
      borderImage: 'linear-gradient(45deg, #00bcdd 0%, #ff00ff 100%)',
      borderImageSlice: '1 1 1 0',
      bottom: '-0.61em',
      right: '0.16em',
      width: '100%',
      height: '.31em',
      transform: 'skewX(-45deg)',
    },
    '&:hover': {
      backgroundSize: '90%',
      transform: 'translate(0.5em,-0.5em)',
      boxShadow: '-1em 1em .15em rgba(0,0,0,0.25)',
      '&:before': {
        backgroundImage: 'linear-gradient(45deg, #00bcdd 0%, #00bcdd 100%)',
        height: 'calc(100% - .20em)',
        borderImageSlice: 1,
      },
      '&:after': {
        backgroundImage: 'linear-gradient(45deg, #00bcdd 0%, #ff00ff 100%)',
        width: 'calc(100% - .20em)',
        borderImageSlice: 1,
      },
    },
  },
  variant({
    variants: {
      contained: {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(45deg, #00bcdd 0%, #ff00ff 100%)',
        borderImage: 'linear-gradient(45deg, lighten(#00bcdd,20%) 0%, lighten(#ff00ff,20%) 100%)',
        borderImageSlice: 1,
        color: 'white',

        '&:before': {
          borderImageSlice: 1,
          left: '-0.80em',
          top: '.15em',
          height: '40px',
        },

        '&:after': {
          borderImageSlice: 1,
          bottom: '-0.75em',
          right: '.15em',
        },
        '&:hover': {
          background: 'transparent',
          backgroundImage: 'linear-gradient(45deg, #00bcdd 0%, #ff00ff 100%)',
          borderImageSlice: 1,
          '&:before': {
            height: '40px',
          },
          '&:after': {
            width: '100%',
          },
        },
      },
      outlined: {
        background: 'transparent',
        '-webkit-text-stroke-width': '0.7px',
        '-webkit-text-stroke-color': '#fe43fd',
        '-webkit-text-fill-color': '#fff',
      },
    },
  }),
  space
)
Button.defaultProps = {
  variant: 'contained',
}

export default Button
