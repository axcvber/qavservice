import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { Container, HeadingTitle, P, Section } from '../styles'
import { ComponentAboutUsAboutUs } from '../generated'

interface IAboutService {
  data: ComponentAboutUsAboutUs
}

const AboutService: React.FC<IAboutService> = ({ data }) => {
  return (
    <Section id='aboutService'>
      <Container>
        <HeadingTitle mb={40} line='right'>
          О сервисе
        </HeadingTitle>
        <AboutServiceContent>
          <AboutServiceText>{data.text}</AboutServiceText>
          <AboutServiceImg>
            <Image
              priority
              src={data.image.data.attributes.url}
              placeholder='blur'
              blurDataURL={data.image.data.attributes.url}
              alt={data.image.data.attributes.alternativeText}
              layout='fill'
              quality={100}
              objectFit='contain'
            />
          </AboutServiceImg>
        </AboutServiceContent>
      </Container>
    </Section>
  )
}

export default AboutService

const AboutServiceImg = styled.div`
  width: 30%;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    max-width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
`

const AboutServiceText = styled(P)`
  width: 70%;
  font-size: 18px;
  margin-right: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    font-size: 16px;
    margin-right: 0;
  }
`

const AboutServiceContent = styled.div`
  background-color: ${({ theme }) => theme.palette.primary};
  padding: 20px 30px;
  border-radius: 10px;
  display: flex;
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.1);
  max-width: 800px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    flex-wrap: wrap-reverse;
  }
`
