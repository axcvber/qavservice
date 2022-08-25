import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { ComponentFooterFoooter } from '../generated'
import Box from '../styles/layout/Box'
import { Container } from '../styles/layout/Container'
import Flex from '../styles/layout/Flex'
import Text from '../styles/layout/Text'
import { navLinks } from './Navbar'
import RSLink from './RSLink'

interface IFooter {
  data: ComponentFooterFoooter
}

const Footer: React.FC<IFooter> = ({ data }) => {
  const [hostname, setHostname] = React.useState<string | undefined>('')
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window?.location.hostname)
    }
  }, [])
  return (
    <Box as='footer' backgroundColor={'#111111'} mt={6} boxShadow='0px 9px 41px 9px rgba(0,0,0,0.44)'>
      <Container display={'flex'} justifyContent='space-between' py={5} flexWrap='wrap'>
        <Box p={3} as='nav'>
          <Text as='h3' mb={3}>
            Навигация
          </Text>
          <Flex as='ul' gap={2} flexDirection='column'>
            {navLinks.map((item, inx) => (
              <li key={`footer-link-${inx}`}>
                <Text color='#666' variant='link' fontSize='md'>
                  <RSLink to={item.path}>{item.title}</RSLink>
                </Text>
              </li>
            ))}
          </Flex>
        </Box>

        <Box p={3} as='nav'>
          <Text as='h3' mb={3}>
            Партнеры
          </Text>
          <Flex as='ul' gap={2} flexDirection='column'>
            {data.partners.map((item) => (
              <li key={item.id}>
                <Text color='#666' mr={2}>
                  {item.text}:
                </Text>
                <a href={`https://t.me/${item.nickname.substring(1)}`} target='_blank' rel='noreferrer noopener'>
                  <Text fontSize='md' color='#fff' variant='link'>
                    {item.nickname}
                  </Text>
                </a>
              </li>
            ))}
          </Flex>
        </Box>
        <Box p={3}>
          <Image
            priority
            width={200}
            height={200}
            src={data.qrCode.data.attributes.url}
            placeholder='blur'
            blurDataURL={data.qrCode.data.attributes.url}
            alt='qr-code'
          />
        </Box>
      </Container>
      <Copyrights py={3} borderTop='1px solid #444444' justifyContent={'center'} color='#fff'>
        <span>
          &copy;{new Date().getFullYear()} {hostname}. All Rights Reserved
        </span>
      </Copyrights>
    </Box>
  )
}

const Copyrights = styled(Flex)`
  span {
    font-size: 14px;
    ${({ theme }) => theme.fonts.OswaldLight};
    letter-spacing: 0.5px;
    color: #666;
  }
`

export default Footer
