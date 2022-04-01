import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../hooks/useAppContext'

const Logo = () => {
  const { cmsData } = useAppContext()
  return (
    <StyledLogo>
      <Image priority src={cmsData.logo.data.attributes.url} alt='logo' width={40} height={40} />
      <LogoTitle>{cmsData.logoTitle}</LogoTitle>
    </StyledLogo>
  )
}

const LogoTitle = styled.h1`
  margin-left: 10px;
  font-size: 18px;
  ${({ theme }) => theme.fonts.PlayRegular};
  color: ${({ theme }) => theme.palette.text.primary};
  letter-spacing: 1.5px;
`

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`

export default Logo
