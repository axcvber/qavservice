import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button, Container, Flex, HeadingTitle } from '../styles'
import { Parallax } from 'react-parallax'
import RSLink from '../components/RSLink'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { useServicesQuery } from '../generated'
import Image from 'next/image'
import { useAppContext } from '../hooks/useAppContext'
import DataLoader from '../components/DataLoader'

const Services = () => {
  const { setServices, setSelectedService } = useAppContext()
  const { loading, data } = useServicesQuery({
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    const services = data?.services.data
    if (services) {
      const arr = services.map((i) => ({ title: i.attributes.title, chatId: i.attributes.telegramChatId }))
      setServices(arr)
    }
  }, [data])

  const onSelectService = (title: string, chatId: number) => {
    setSelectedService({
      title,
      chatId,
    })
  }

  return (
    <StyledServices id='services'>
      <Parallax
        strength={200}
        bgClassName='image-parallax'
        className='custom-parallax'
        bgImage={'/services/space.jpg'}
        bgImageAlt='space'
      >
        <Container style={{ zIndex: 9, position: 'relative' }}>
          <Flex justify='center'>
            <HeadingTitle mb={30} line='top'>
              Наши услуги
            </HeadingTitle>
          </Flex>

          <ServicesType>
            <StyledSwiper
              slidesPerView={3}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              className='mySwiper'
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                769: {
                  slidesPerView: 1,
                },
                993: {
                  slidesPerView: 2,
                },
                1199: {
                  slidesPerView: 3,
                },
              }}
            >
              {loading ? (
                <div style={{ minHeight: '350px' }}>
                  <DataLoader />
                </div>
              ) : (
                data?.services.data.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ServicesItem>
                      <HoverLines />
                      <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                        <Image
                          priority
                          layout='responsive'
                          width={50}
                          height={50}
                          placeholder='blur'
                          blurDataURL={item.attributes.icon.data.attributes.url}
                          src={item.attributes.icon.data.attributes.url}
                          alt={item.attributes.icon.data.attributes.alternativeText}
                        />
                      </div>
                      <h4 style={{ fontWeight: 600 }}>{item.attributes.title}</h4>
                      <p>{item.attributes.description}</p>
                      <RSLink to='form'>
                        <Button
                          variant='outlined'
                          onClick={() => onSelectService(item.attributes.title, item.attributes.telegramChatId)}
                        >
                          Заказать
                        </Button>
                      </RSLink>
                    </ServicesItem>
                  </SwiperSlide>
                ))
              )}
            </StyledSwiper>
          </ServicesType>
        </Container>
      </Parallax>
    </StyledServices>
  )
}

export default Services

const StyledSwiper = styled(Swiper)`
  width: 75%;
  padding: 3px;
  position: static;
  margin: auto;
  user-select: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
  }
`

const HoverLines = styled.span`
  border-radius: 10px;
  color: ${({ theme }) => theme.palette.primary};
  height: 0;
  width: 0;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-bottom: 2px solid currentColor;
  border-left: 0 solid currentColor;
  border-right: 0 solid currentColor;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1) 340ms, height 0.2s cubic-bezier(0.25, 0.25, 0.75, 0.75) 145ms,
    border-left-width 0s cubic-bezier(0.25, 0.25, 0.75, 0.75) 340ms,
    border-right-width 0s cubic-bezier(0.25, 0.25, 0.75, 0.75) 340ms;
  z-index: -1;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 4.2px;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 150ms cubic-bezier(0.25, 0.25, 0.75, 0.75) 0s;
  }

  &:after {
    border-radius: 10px;
    content: '';
    position: absolute;
    top: 0;
    left: 4.2px;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 150ms cubic-bezier(0.25, 0.25, 0.75, 0.75) 0s;
  }
`

const ServicesItem = styled.div`
  margin: 10px;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 350px;
  padding: 15px;
  background-color: ${({ theme }) => theme.palette.bg.primary};
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.51);
  text-align: center;
  border-radius: 10px;
  transition: all ${({ theme }) => theme.transition};
  position: relative;
  z-index: 0;
  h4 {
    ${({ theme }) => theme.fonts.OswaldRegular};
    color: ${({ theme }) => theme.palette.text.primary};
    text-transform: uppercase;
    line-height: 1.8;
    font-size: 15px;
    letter-spacing: 0.8px;
  }
  p {
    ${({ theme }) => theme.fonts.PlayRegular};
    font-size: 14px;
    font-style: italic;
    line-height: 1.5;
    padding: 5px;
  }
  &:hover {
    background-color: #000;
    ${HoverLines} {
      height: 100%;
      width: 100%;
      border-color: ${({ theme }) => theme.palette.primary};
      border-left-width: 3px;
      border-right-width: 3px;
      transition: width 150ms cubic-bezier(0.25, 0.25, 0.75, 0.75),
        height 0.2s cubic-bezier(0.25, 0.25, 0.75, 0.75) 145ms,
        border-left-width 0s cubic-bezier(0.25, 0.25, 0.75, 0.75) 145ms,
        border-right-width 0s cubic-bezier(0.25, 0.25, 0.75, 0.75) 145ms;
      &:before {
        width: 50%;
        transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1) 340ms;
      }
      &:after {
        width: 50%;
        transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1) 340ms;
        left: auto;
        right: 4.2px;
      }
    }
    ${Button} {
      color: ${({ theme }) => theme.palette.text.primary};
      background-color: ${({ theme }) => theme.palette.primary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    &:hover {
      background-color: ${({ theme }) => theme.palette.bg.primary};
      ${HoverLines} {
        height: 0;
        width: 0;
        border-color: $primaryColor;
        border-left-width: 0px;
        border-right-width: 0px;
        &::before {
          width: 0;
        }
        &::after {
          width: 0;
        }
      }
    }
  }
`

const ServicesType = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  user-select: none;
  margin: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 60%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`

const StyledServices = styled.div`
  .react-parallax-content {
    width: 100%;
  }
  .custom-parallax {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 100px 0;
    background-color: ${({ theme }) => theme.palette.bg.primary};
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 20%,
          rgba(0, 0, 0, 0) 80%,
          rgba(0, 0, 0, 1) 100%
        ),
        rgba(0, 0, 0, 0.2);
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-height: auto;
      padding: 50px 0;
    }
  }
  .image-parallax {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: left top;
  }
`
