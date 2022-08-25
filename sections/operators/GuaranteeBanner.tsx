import Image from 'next/image'
import React from 'react'
import Box from '../../styles/layout/Box'
import Button from '../../styles/layout/Button'
import Flex from '../../styles/layout/Flex'
import Heading from '../../styles/layout/Heading'
import Text from '../../styles/layout/Text'

interface IGuaranteeBanner {
  avatarUrl: string
  alt: string
  nickname: string
  desc: string
  chatLink: string
  reviewsLink: string
}

const GuaranteeBanner: React.FC<IGuaranteeBanner> = ({ avatarUrl, alt, nickname, desc, chatLink, reviewsLink }) => {
  return (
    <Box backgroundColor={'purple.2'} p={4} borderRadius={3} boxShadow='10px 10px 20px -10px rgba(0,0,0,0.75)'>
      <Flex gap={4} flexDirection={{ default: 'column', md: 'row' }}>
        <Flex flexDirection='column' alignItems='center'>
          <Box
            display='flex'
            border='3px solid'
            borderColor='turquoise'
            borderRadius={5}
            overflow='hidden'
            mb={2}
            boxShadow='0 10px 20px -10px rgba(0,0,0,0.75)'
          >
            <Image
              priority
              width={130}
              height={130}
              src={avatarUrl}
              alt={alt}
              placeholder={'blur'}
              blurDataURL={avatarUrl}
            />
          </Box>
          <a href={`https://t.me/${nickname.substring(1)}`} target='_blank' rel='noreferrer noopener'>
            <Text color='#37E6FE' fontSize={{ default: 'xl', md: 'lg' }} variant='link'>
              {nickname}
            </Text>
          </a>
        </Flex>
        <Box>
          <Text fontSize={{ default: 'md', sm: 'lg' }} mb={4} textAlign={{ default: 'center', md: 'left' }}>
            {desc}
          </Text>
          <Flex
            gap={4}
            justifyContent={{ default: 'center', md: 'flex-end' }}
            flexDirection={{ default: 'column', sm: 'row' }}
          >
            <Box as='a' href={chatLink} target='_blank' rel='noreferrer noopener' mx={{ default: 'auto', sm: 0 }}>
              <Button variant='outlined'>Чат гаранта</Button>
            </Box>
            <Box as='a' href={reviewsLink} target='_blank' rel='noreferrer noopener' mx={{ default: 'auto', sm: 0 }}>
              <Button variant='outlined'>Отзывы гаранта</Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default GuaranteeBanner
