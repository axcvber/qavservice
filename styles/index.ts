import styled, { css } from 'styled-components'

export const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints?.xl};
  padding: 0 15px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 960px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 720px;
  }
  @media (max-width: (max-width: ${({ theme }) => theme.breakpoints.md})) {
    max-width: 540px;
  }
  @media (max-width: (max-width: ${({ theme }) => theme.breakpoints.sm})) {
    max-width: 100%;
  }
`

export const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 100px 0;
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: auto;
    padding: 50px 0;
  }
`

export const Button = styled.button<{ variant: 'contained' | 'outlined'; width?: string }>`
  width: ${({ width }) => (width ? width : 'auto')};
  outline: none;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
  padding: 10px 25px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-size: 14px;
  transition: all ${({ theme }) => theme.transition};
  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.palette.primary};
      color: ${({ theme }) => theme.palette.primary};
      &:hover {
        color: #fff;
        background-color: ${({ theme }) => theme.palette.primary};
        box-shadow: 0px 10px 25px -10px ${({ theme }) => theme.palette.primary};
        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
          box-shadow: none;
        }
      }
    `};

  ${({ variant }) =>
    variant === 'contained' &&
    css`
      border: 2px solid transparent;
      background-color: ${({ theme }) => theme.palette?.primary};
      color: #fff;
      &:hover {
        background-color: ${({ theme }) => theme.palette?.primary};
        box-shadow: 0px 1px 15px -3px ${({ theme }) => theme.palette?.primary};
      }
    `};

  &:disabled {
    opacity: 0.6;
  }
`

export const P = styled.p`
  line-height: 1.6;
  color: #fff;
  ${({ theme }) => theme.fonts.PlayRegular};
`

export const HeadingTitle = styled.h1<{ line: 'right' | 'left' | 'top'; mb?: number }>`
  color: #fff;
  display: inline-flex;
  font-size: 50px;
  margin-bottom: ${({ mb }) => mb + 'px'};
  ${({ theme }) => theme.fonts.OswaldMedium};
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 40px;
  }
  ${({ line }) =>
    line === 'right' &&
    css`
      &::after {
        content: '';
        display: block;
        margin: auto 20px;
        width: 50px;
        height: 2px;
        background-color: ${({ theme }) => theme.palette.primary};
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: flex;
        justify-content: center;
      }
    `}

  ${({ line }) =>
    line === 'left' &&
    css`
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: -70px;
        top: 60%;
        display: block;
        width: 50px;
        height: 2px;
        background-color: ${({ theme }) => theme.palette.primary};
      }
    `}

  ${({ line }) =>
    line === 'top' &&
    css`
      flex-direction: column;
      &::before {
        margin: 0 auto 15px auto;
        content: '';
        display: block;
        width: 80px;
        height: 2px;
        background-color: ${({ theme }) => theme.palette.primary};
      }
    `}
`
interface FlexProps {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse'
  justify?: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end'
  alignItems?: 'center' | 'flex-end' | 'flex-start' | 'stretch' | 'baseline'
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => {
    switch (direction) {
      case 'column':
        return 'column'
      case 'row':
        return 'row'
      case 'column-reverse':
        return 'column-reverse'
      case 'row-reverse':
        return 'row-reverse'
      default:
        return 'row'
    }
  }};
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'center':
        return 'center'
      case 'space-between':
        return 'space-between'
      case 'space-around':
        return 'space-around'
      case 'space-evenly':
        return 'space-evenly'
      case 'flex-end':
        return 'flex-end'
      default:
        return 'flex-start'
    }
  }};
  align-items: ${({ alignItems }) => {
    switch (alignItems) {
      case 'center':
        return 'center'
      case 'flex-end':
        return 'flex-end'
      case 'flex-start':
        return 'flex-start'
      case 'stretch':
        return 'stretch'
      case 'baseline':
        return 'baseline'
      default:
        return 'flex-start'
    }
  }};
`
export const Error = styled.span`
  color: ${({ theme }) => theme.palette.error};
  font-size: 13px;
  display: block;
  margin-top: 5px;
`

export const FormError = styled(Error)`
  margin-top: 0px;
  margin-bottom: 25px;
`

export const Arrow = styled.div<{ isOpen: boolean }>`
  position: relative;
  height: 10px;
  width: 10px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1.5px;
    height: 100%;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
  }
  &::before {
    left: -3.2px;
    transform: rotate(-45deg);
    background-color: ${({ theme }) => theme.palette.text.secondary};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: -3.2px;
        transform: rotate(45deg);
      `}
  }
  &::after {
    left: 3.2px;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette.text.secondary};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: 3.2px;
        transform: rotate(-45deg);
      `}
  }
`
export const H3 = styled.h3<{ margin?: string }>`
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: ${({ margin }) => margin};
  font-size: 17px;
`
