import Image from 'next/image'
import React from 'react'
import { ComponentAboutServiceAboutService } from '../generated'
import Heading from '../styles/layout/Heading'
import Flex from '../styles/layout/Flex'
import { Container } from '../styles/layout/Container'
import Box from '../styles/layout/Box'
import Text from '../styles/layout/Text'
import Button from '../styles/layout/Button'
import BackgroundTitle from '../components/BackgroundTitle'
import BackgroundImage from '../components/BackgroundImage'

interface IAboutService {
  data: ComponentAboutServiceAboutService
}

const AboutService: React.FC<IAboutService> = ({ data }) => {
  return (
    <Box as='section' id='about-service' my={{ default: 5, lg: 7 }} position='relative'>
      <Container>
        <Flex
          width='100%'
          gap={5}
          alignItems={{ sm: 'flex-end', lg: 'center' }}
          flexDirection={{ default: 'column', lg: 'row' }}
        >
          <Flex width={1} flexDirection={'column'} alignItems={{ default: 'center', sm: 'flex-start' }}>
            <Heading line={'right'} textAlign='center' mb={2} fontSize={[5, 6]}>
              О сервисе
            </Heading>
            <Text fontSize='md' mb={4} textAlign={{ default: 'center', sm: 'left' }}>
              {data.text}
            </Text>
            <a href={data.telegramLink} target='_blank' rel='noreferrer noopener'>
              <Button>Телеграмм канал</Button>
            </a>
          </Flex>
          <Box position='relative' width={[1, 1, 1 / 2]} height={'400px'}>
            <Image
              priority
              src={data.image.data.attributes.url}
              placeholder='blur'
              blurDataURL={data.image.data.attributes.url}
              alt={data.image.data.attributes.alternativeText}
              layout='fill'
              objectFit='contain'
            />
          </Box>
        </Flex>
      </Container>
      <BackgroundTitle variant='left' title={'О сервисе'} />
      <BackgroundImage variant='right-bottom' />
    </Box>
  )
}

export default AboutService
