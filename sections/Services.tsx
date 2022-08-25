import React from 'react'
import styled from 'styled-components'
import RSLink from '../components/RSLink'
import { ServiceEntity } from '../generated'
import Image from 'next/image'
import { useAppContext } from '../hooks/useAppContext'
import { Container } from '../styles/layout/Container'
import Flex from '../styles/layout/Flex'
import Heading from '../styles/layout/Heading'
import Box from '../styles/layout/Box'
import Button from '../styles/layout/Button'
import Text from '../styles/layout/Text'
import BackgroundTitle from '../components/BackgroundTitle'
import BackgroundImage from '../components/BackgroundImage'

interface IServices {
  services: Array<ServiceEntity>
}

const Services: React.FC<IServices> = ({ services }) => {
  const { setSelectedService } = useAppContext()

  const onSelectService = (title: string) => {
    setSelectedService(title)
  }

  return (
    <Box id='services' my={{ default: 5, lg: 7 }} position='relative'>
      <Container>
        <Flex justifyContent='center'>
          <Heading line='bottom' textAlign='center' mb={2} fontSize={[5, 6]}>
            Услуги
          </Heading>
        </Flex>

        <Flex justifyContent='center' gap={4} flexWrap='wrap'>
          {services.map((item) => (
            <Card key={item.id}>
              <Circle>
                <IconWrap>
                  <Image
                    priority
                    width={60}
                    height={60}
                    placeholder='blur'
                    blurDataURL={item.attributes.icon.data.attributes.url}
                    src={item.attributes.icon.data.attributes.url}
                    alt={item.attributes.icon.data.attributes.alternativeText}
                  />
                </IconWrap>
              </Circle>

              <Text as='h4' fontSize='lg' fontWeight={400}>
                {item.attributes.title}
              </Text>
              <Flex as='ol' gap={3} flexDirection='column'>
                {item.attributes.subservices.map((item) => (
                  <li key={item.id}>
                    <p>{item.name}</p>
                  </li>
                ))}
              </Flex>

              <RSLink to='form'>
                <Button ml={2} mb={2} onClick={() => onSelectService(item.attributes.title)}>
                  Выбрать
                </Button>
              </RSLink>
            </Card>
          ))}
        </Flex>
      </Container>
      <BackgroundTitle variant='center' title={'Услуги'} />
      <BackgroundImage variant='left-bottom' />
    </Box>
  )
}

export default Services

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple[0]};
  z-index: 9;
  transition: all 0.3s ease-out;
`

const Circle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.purple[0]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease-out;
  overflow: visible;
  margin-bottom: 10px;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    background: #6215c6;
    border-radius: 50%;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease-out;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 300px;
  padding: 30px 40px;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.purple[2]};
  box-shadow: 11px 15px 45px -4px rgba(0, 0, 0, 0.33);
  border-radius: 25px;
  h4 {
    font-size: 22px;
    color: #fff;
    z-index: 1;
  }
  ol {
    ${({ theme }) => theme.fonts.OswaldRegular};
    color: #fff;
    font-size: 17px;
    margin: 15px 0;
    margin-bottom: 25px;
    padding-left: 15px;
    z-index: 1;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(254, 67, 253, 1) 0%, rgba(98, 21, 198, 1) 71%);
    clip-path: circle(50px at 50% 20.5%);
    transition: 0.3s linear;
  }
  &:hover {
    &:before {
      clip-path: circle(350px at 50% 20.5%);
    }
    ${Circle} {
      border-color: ${({ theme }) => theme.colors.purple[1]};
      background: ${({ theme }) => theme.colors.purple[1]};
      &:after {
        background: ${({ theme }) => theme.colors.pink};
      }
    }
    ${IconWrap} {
      background: ${({ theme }) => theme.colors.purple[2]};
    }
  }
`
