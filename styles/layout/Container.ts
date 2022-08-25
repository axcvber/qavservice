import styled from 'styled-components'
import { flexbox, layout, space, position, PositionProps, FlexboxProps, LayoutProps, SpaceProps } from 'styled-system'

export const Container = styled.div<FlexboxProps & LayoutProps & SpaceProps & PositionProps>`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin: 0 auto;
  padding: 0 20px;
  ${flexbox}
  ${layout}
  ${space}
  ${position}
`

Container.defaultProps = {
  // display: 'flex',
  maxWidth: 'xl',
}
