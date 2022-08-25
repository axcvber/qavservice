import React from 'react'
import Box from '../../styles/layout/Box'
import Text from '../../styles/layout/Text'

interface IOperatorDesc {
  nickname: string
  desc: string
}

const OperatorDesc: React.FC<IOperatorDesc> = ({ nickname, desc }) => {
  return (
    <Box width={[1]}>
      <Box
        as='a'
        display='flex'
        justifyContent={{ default: 'center', md: 'flex-start' }}
        href={`https://t.me/${nickname.substring(1)}`}
        target='_blank'
        rel='noreferrer noopener'
      >
        <Text variant='link' gradientFrom='#37E6FE' gradientTo='#FE43FD' as='h4' fontSize={{ default: 'xl', md: 'lg' }}>
          {nickname}
        </Text>
      </Box>
      <Text textAlign={{ default: 'center', md: 'left' }}>{desc}</Text>
    </Box>
  )
}

export default OperatorDesc
