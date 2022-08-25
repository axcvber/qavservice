import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Box from '../styles/layout/Box'
import Button from '../styles/layout/Button'
import Flex from '../styles/layout/Flex'
import { navLinks } from './Navbar'
import RSLink from './RSLink'

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [menuOpen])

  const menuVariants = {
    key: 'mobile-menu',
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { ease: [0.645, 0.045, 0.355, 1] },
  }

  return (
    <>
      <HamburgerButton menuOpen={menuOpen} onClick={toggleMenu}>
        <LineMenu />
        <LineMenu />
        <LineMenu />
      </HamburgerButton>

      <AnimatePresence exitBeforeEnter>
        {menuOpen && (
          <StyledSidebar {...menuVariants}>
            <Flex as='nav' flexDirection='column' justifyContent='center' alignItems='center' height={'100%'}>
              <ul>
                {navLinks.map((item, inx: number) => (
                  <li key={inx}>
                    <RSLink onClick={() => setMenuOpen(false)} to={item.path}>
                      {item.title}
                    </RSLink>
                  </li>
                ))}
              </ul>
              <RSLink to='form' onClick={() => setMenuOpen(false)}>
                <Button>Оставить заявку</Button>
              </RSLink>
            </Flex>
            <Box position={'absolute'} top={0} left={0} width='100%' height='100%' zIndex={-1}>
              <Image priority src='/mobile-bg.jpg' layout='fill' alt='background' />
            </Box>
          </StyledSidebar>
        )}
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        {menuOpen && (
          <motion.div
            onClick={() => setMenuOpen(false)}
            key='overlay-filter-bar'
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              width: '100%',
              height: '100vh',
              top: 0,
              right: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 98,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu

const LineMenu = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  width: 100%;
  height: 2px;
  transition: all 0.3s ease-out;

  &:first-child {
    width: 50%;
    transition: transform 0.3s cubic-bezier(0.54, -0.81, 0.57, 0.57);
    transform-origin: right;
  }
  &:last-child {
    width: 50%;
    align-self: flex-end;
    transition: transform 0.3s cubic-bezier(0.54, -0.81, 0.57, 0.57);
    transform-origin: left;
  }
`

const HamburgerButton = styled.button<{ menuOpen: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease-out;
  position: relative;
  z-index: 100;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.white};
  padding: 10px;
  border-radius: 50px;

  ${({ menuOpen }) =>
    menuOpen &&
    css`
      transform: rotate(-45deg);
      border-color: ${({ theme }) => theme.colors.white};

      ${LineMenu} {
        background-color: ${({ theme }) => theme.colors.white};

        &:first-child {
          transform: rotate(-90deg) translateX(1.5px);
        }
        &:last-child {
          transform: rotate(-90deg) translateX(-1.5px);
        }
      }
    `}
`

const StyledSidebar = styled(motion.aside)`
  position: relative;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 50px 10px;
  width: 100%;
  height: 100vh;
  outline: 0;
  z-index: 99;
  background-color: ${({ theme }) => theme.colors.purple[0]};

  ul {
    width: 100%;
    text-align: center;
    li {
      position: relative;
      margin: 0 auto 40px;
    }
    a {
      width: 100%;
      font-size: 22px;
      letter-spacing: 1px;
      -webkit-text-stroke-width: 1.4px;
      -webkit-text-stroke-color: ${({ theme }) => theme.colors.pink};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
    }
  }
`
