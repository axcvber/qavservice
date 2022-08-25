import styled from 'styled-components'
import Box from './Box'
import { system } from 'styled-system'

const Flex = styled(Box)<{ gap?: number }>(
  system({
    gap: {
      property: 'gap',
      scale: 'space',
      transform: (value, scale) => scale[value],
    },
  })
)

Flex.defaultProps = {
  display: 'flex',
}

export default Flex
