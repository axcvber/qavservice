import React from 'react'
import styled from 'styled-components'
import ScrollDown from '../../components/animations/ScrollDown'
import BackgroundImage from '../../components/BackgroundImage'
import { ComponentHeroHero } from '../../generated'
import BGvideo from './BGvideo'

interface IHero {
  data: ComponentHeroHero
}

const Hero: React.FC<IHero> = ({ data }) => {
  return (
    <StyledHero id='hero'>
      <BGvideo bgUrl={data.bgVideo.data.attributes.url} mobileBgUrl={data.bgVideoMobile.data.attributes.url} />
      <ScrollDown />

      <BackgroundImage variant='left-bottom' />
      <BackgroundImage variant='right-top' />
    </StyledHero>
  )
}

export default Hero

const StyledHero = styled.section`
  width: 100%;
  position: relative;
  min-height: 100vh;
`
