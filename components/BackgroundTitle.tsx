import React from 'react'
import Box from '../styles/layout/Box'
import Heading from '../styles/layout/Heading'

interface IBackgroundTitle {
  title: string
  variant: 'left' | 'right' | 'center' | 'left-vertical' | 'right-vertical'
}

const BackgroundTitle: React.FC<IBackgroundTitle> = ({ title, variant }) => {
  const renderSwitch = (variant) => {
    switch (variant) {
      case 'left':
        return (
          <Box position={'absolute'} top={{ default: '60%', lg: '100%' }} left={'-3%'} zIndex={-1}>
            <Heading variant='background'>{title}</Heading>
          </Box>
        )
      case 'right':
        return (
          <Box position={'absolute'} top={{ default: '60%', lg: '100%' }} right={'3%'} zIndex={-1}>
            <Heading variant='background'>{title}</Heading>
          </Box>
        )
      case 'center':
        return (
          <Box
            position={'absolute'}
            top={{ default: '60%', lg: '100%' }}
            left={'50%'}
            zIndex={-1}
            style={{
              transform: 'translateX(-50%)',
            }}
          >
            <Heading variant='background'>{title}</Heading>
          </Box>
        )
      case 'right-vertical':
        return (
          <Box
            position={'absolute'}
            top={{ default: '60%', lg: '50%' }}
            right={0}
            zIndex={-1}
            style={{
              writingMode: 'vertical-rl',
              transform: 'translateY(-50%)',
            }}
          >
            <Heading variant='background'>{title}</Heading>
          </Box>
        )
      case 'left-vertical':
        return (
          <Box
            position={'absolute'}
            top={{ default: '60%', lg: '40%' }}
            left={'20%'}
            zIndex={-1}
            style={{
              writingMode: 'vertical-rl',
            }}
          >
            <Heading variant='background'>{title}</Heading>
          </Box>
        )
      default:
        return null
    }
  }

  return <>{renderSwitch(variant)}</>
}

export default BackgroundTitle
