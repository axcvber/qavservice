import React from 'react'
import styled, { css } from 'styled-components'
import { Button, Container } from '../styles'
import Logo from './Logo'
import RSLink from './RSLink'

const navData = [
  {
    title: 'О сервисе',
    path: 'aboutService',
  },
  {
    title: 'Наши услуги',
    path: 'services',
  },
  {
    title: 'Отзывы',
    path: 'reviews',
  },
]

const Header = () => {
  const [stickyNav, setStickyNav] = React.useState<boolean>(false)
  const [activeMenu, setActiveMenu] = React.useState<boolean>(false)

  const onToggle = () => {
    setActiveMenu((prev) => !prev)
  }

  const scrollHandler = () => {
    if (window.pageYOffset > 0) {
      setStickyNav(true)
    } else {
      setStickyNav(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <HeaderWrapper stickyNav={stickyNav}>
      <StyledHeader>
        <RSLink to='hero'>
          <Logo />
        </RSLink>
        <Nav activeMenu={activeMenu}>
          <NavMenu>
            {navData.map((item, inx) => (
              <NavItem key={`nav-item${inx}`}>
                <RSLink onClick={onToggle} to={item.path}>
                  {item.title}
                </RSLink>
              </NavItem>
            ))}
            <RSLink onClick={onToggle} to='form'>
              <NavButton variant='contained'>Оставить заявку</NavButton>
            </RSLink>
          </NavMenu>
        </Nav>
        <NavBurger onClick={onToggle} isActive={activeMenu}>
          <span></span>
        </NavBurger>
      </StyledHeader>
    </HeaderWrapper>
  )
}

export default Header

const NavBurger = styled.div<{ isActive: boolean }>`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    position: relative;
    width: 30px;
    height: 20px;
    z-index: 999999;
    &::before,
    &::after {
      content: '';
      background-color: ${({ theme }) => theme.palette.text.primary};
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      transition: all 0.2s ease;
    }
    &::before {
      width: 60%;
      top: 0;
    }
    &::after {
      bottom: 0;
    }
    span {
      position: absolute;
      background-color: ${({ theme }) => theme.palette.text.primary};
      left: 0;
      width: 80%;
      height: 2px;
      top: 9px;
      transition: all ${({ theme }) => theme.transition};
    }
  }
  ${({ isActive }) =>
    isActive &&
    css`
      &::before {
        transform: rotate(45deg);
        top: 9px;
        width: 100%;
      }
      &::after {
        transform: rotate(-45deg);
        bottom: 9px;
      }
      span {
        transform: scale(0);
      }
    `}
`

const NavButton = styled(Button)`
  font-size: 14px;
  border-radius: 5px;
  padding: 10px 20px;
  ${({ theme }) => theme.fonts.OswaldRegular};
`

const NavItem = styled.li`
  margin-right: 20px;
  a {
    display: inline-block;
    transition: all 0.3s ease-in-out;
    text-transform: uppercase;
    font-size: 14px;
    position: relative;
    color: ${({ theme }) => theme.palette.text.primary};
    cursor: pointer;
    ${({ theme }) => theme.fonts.OswaldRegular};
    letter-spacing: 1.2px;
    &:after {
      visibility: hidden;
      position: absolute;
      bottom: -7px;
      left: 0;
      right: 0;
      margin: auto;
      width: 0%;
      content: '.';
      color: transparent;
      background-color: ${({ theme }) => theme.palette.primary};
      height: 2px;
      transition: all 0.3s ease;
    }
    &:hover {
      &:after {
        width: 100%;
        visibility: visible;
      }
    }
  }
`

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
`

const Nav = styled.nav<{ activeMenu: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    background-color: #000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: ${({ activeMenu }) => (activeMenu ? 'translateY(0)' : 'translateY(-100%)')};
    transition: all 0.2s ease;
    z-index: 9999;
    flex-direction: column;
    justify-content: center;
    ${NavMenu} {
      flex-direction: column;
      justify-content: center;
      min-height: 100%;
      padding: 20px 0;
      ${NavItem} {
        margin: 20px 0;
        a {
          font-size: 20px !important;
          &:hover {
            &::after {
              width: 0;
              visibility: hidden;
            }
          }
        }
      }
      ${NavButton} {
        margin: 20px 0;
        font-size: 18px;
        padding: 10px 25px;
      }
    }
  }
`

const StyledHeader = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderWrapper = styled.header<{ stickyNav: boolean }>`
  width: 100%;
  position: fixed;
  transition: all ${({ theme }) => theme.transition};
  z-index: 999;
  padding: 30px 0;
  padding: 18px 0;

  ${({ stickyNav }) =>
    stickyNav &&
    css`
      /* background-color: ${({ theme }) => theme.palette.bg.primary}; */
      background-color: #000;
      box-shadow: 0px 8px 12px 1px rgba(107, 34, 208, 0.46);
      border-bottom: 1px solid #6b22d0;
      padding: 15px 0;
      ${NavItem} {
        a {
          font-size: 13px;
        }
      }
      ${NavButton} {
        font-size: 13px;
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 0;
  }
`
