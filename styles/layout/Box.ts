import styled from 'styled-components'
import {
  space,
  color,
  border,
  layout,
  flexbox,
  grid,
  position,
  compose,
  shadow,
  SpaceProps,
  ColorProps,
  BorderProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  PositionProps,
  ShadowProps,
} from 'styled-system'

type BoxProps = SpaceProps &
  ColorProps &
  BorderProps &
  LayoutProps &
  FlexboxProps &
  GridProps &
  PositionProps &
  ShadowProps

const Box = styled('div')<BoxProps>(compose(space, color, border, layout, flexbox, grid, position, shadow))

export default Box
