import styled, { css } from 'styled-components'

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

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  display: block;
  margin-top: 5px;
`

export const Arrow = styled.div<{ isOpen: boolean; isError: boolean }>`
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
    background-color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.white)};
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
    background-color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.white)};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: 3.2px;
        transform: rotate(-45deg);
      `}
  }
`
