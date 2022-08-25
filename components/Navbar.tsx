import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import useScrollDirection from '../hooks/useScrollDirection'
import Box from '../styles/layout/Box'
import Button from '../styles/layout/Button'
import { Container } from '../styles/layout/Container'
import Flex from '../styles/layout/Flex'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import RSLink from './RSLink'

export const navLinks = [
  {
    title: 'О сервисе',
    path: 'about-service',
  },
  {
    title: 'Услуги',
    path: 'services',
  },
  {
    title: 'Операторы',
    path: 'operators',
  },
  {
    title: 'Отзывы',
    path: 'reviews',
  },
]

const Navbar = () => {
  const scrollDirection = useScrollDirection('down')
  const [scrolledToTop, setScrolledToTop] = useState<boolean>(true)

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <Container
        position={'relative'}
        as='nav'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        height='100%'
      >
        <RSLink to='hero'>
          <Logo scrolledToTop={scrolledToTop} />
        </RSLink>
        <NavMenu as='ul' gap={2} display={{ default: 'none', lg: 'flex' }}>
          {navLinks.map((item, inx) => (
            <NavItem key={`nav-link-${inx}`}>
              <div className='left-corner' />
              <RSLink to={item.path}>{item.title}</RSLink>
              <div className='right-corner' />
            </NavItem>
          ))}
        </NavMenu>

        <Box display={{ default: 'none', lg: 'block' }}>
          <RSLink to='form'>
            <Button mb={2}>Оставить заявку</Button>
          </RSLink>
        </Box>
        <Box display={{ default: 'block', lg: 'none' }}>
          <MobileMenu />
        </Box>
      </Container>
    </StyledHeader>
  )
}

export default Navbar

const NavItem = styled.li`
  position: relative;
  line-height: 1;
  &::before,
  &::after {
    height: 12px;
    width: 12px;
    position: absolute;
    content: '';
    transition: all 0.3s ease;
    opacity: 0;
  }
  &::before {
    left: -5px;
    top: -5px;
    border-left: 2.5px solid ${({ theme }) => theme.colors.pink};
    border-top: 2.5px solid ${({ theme }) => theme.colors.pink};
    transform: translate(100%, 65%);
  }
  &::after {
    right: -5px;
    bottom: -5px;
    border-right: 2.5px solid ${({ theme }) => theme.colors.pink};
    border-bottom: 2.5px solid ${({ theme }) => theme.colors.pink};
    transform: translate(-100%, -65%);
  }
  &:hover {
    &::before,
    &::after {
      transform: translate(0%, 0%);
      opacity: 1;
    }
    a {
      &::before,
      &::after {
        transform: translate(0%, 0%);
        opacity: 1;
      }
    }
  }

  a {
    padding: 0.3em 0.7em;
    display: block;
    position: relative;
    font-size: 16px;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: #fe43fd;
    -webkit-text-fill-color: #fff;
    &::before,
    &::after {
      height: 6px;
      width: 6px;
      position: absolute;
      content: '';
      transition: all 0.3s ease;
      opacity: 0;
    }
    &::before {
      left: 0;
      top: 0;
      border-left: 2.5px solid ${({ theme }) => theme.colors.turquoise};
      border-top: 2.5px solid ${({ theme }) => theme.colors.turquoise};
      transform: translate(100%, 60%);
    }
    &::after {
      right: 0;
      bottom: 0;
      border-right: 2.5px solid ${({ theme }) => theme.colors.turquoise};
      border-bottom: 2.5px solid ${({ theme }) => theme.colors.turquoise};
      transform: translate(-100%, -60%);
    }
  }
`

const NavMenu = styled(Flex)`
  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const StyledHeader = styled.header<{ scrollDirection: string; scrolledToTop: boolean }>`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  height: 100px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${({ scrollDirection, scrolledToTop }) =>
    scrollDirection === 'up' &&
    !scrolledToTop &&
    css`
      height: 80px;
      background-color: rgba(98, 21, 198, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0px 3px 14px 8px rgba(0, 0, 0, 0.39);
    `}

  ${({ scrollDirection, scrolledToTop }) =>
    scrollDirection === 'down' &&
    !scrolledToTop &&
    css`
      transform: translateY(-110px);
      backdrop-filter: blur(10px);
      background-color: rgba(98, 21, 198, 0.9);
      box-shadow: 0px 3px 14px 8px rgba(0, 0, 0, 0.39);
    `}
`
