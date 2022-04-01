import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ComponentTitleTitle } from '../../generated'
import BGvideo from './BGvideo'

interface IHero {
  title: ComponentTitleTitle
  bgUrl: string
}

const Hero: React.FC<IHero> = ({ title, bgUrl }) => {
  return (
    <StyledHero id='hero'>
      <BGvideo bgUrl={bgUrl} />
      <HeroBlock>
        <HeroBlockSubtitle>
          <h4>{title.topText}</h4>
        </HeroBlockSubtitle>
        <HeroBlockTitle>
          <h1>{title.middleText}</h1>
          <h4>{title.bottomText}</h4>
        </HeroBlockTitle>
      </HeroBlock>
      <IconScroll />
    </StyledHero>
  )
}

export default Hero

const scroll = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(30px);
  }
`
const IconScroll = styled.div`
  z-index: 99;
  width: 32px;
  height: 55px;
  margin-left: -20px;
  margin-top: -35px;
  box-shadow: inset 0 0 0 1.5px ${({ theme }) => theme.palette.text.primary};
  border-radius: 25px;
  position: absolute;
  bottom: 5%;
  left: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
  &:before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.palette.text.primary};
    margin-left: -3px;
    top: 10px;
    border-radius: 4px;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-name: ${scroll};
    position: absolute;
    bottom: 8%;
    left: 50%;
  }
`

const HeroBlockTitle = styled.div`
  text-transform: uppercase;
  h1 {
    line-height: 1.5;
    font-size: 55px;
    letter-spacing: 0.1rem;
    ${({ theme }) => theme.fonts.PlayBold};
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 45px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 40px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 35px;
    }
  }
  h4 {
    font-size: 25px;
    letter-spacing: 4px;
    ${({ theme }) => theme.fonts.OswaldLight};
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 20px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 18px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 15px;
    }
  }
`

const HeroBlockSubtitle = styled.div`
  text-transform: uppercase;
  h4 {
    font-size: 25px;
    ${({ theme }) => theme.fonts.OswaldLight};
    letter-spacing: 4px;
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 20px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 18px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 15px;
    }
  }
`

const HeroBlock = styled.div`
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
`

const StyledHero = styled.section`
  width: 100%;
  position: relative;
  min-height: 100vh;
`
