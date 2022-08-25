import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../hooks/useAppContext'

const Logo: React.FC<{ scrolledToTop: boolean }> = ({ scrolledToTop }) => {
  const { cmsData } = useAppContext()
  return (
    <StyledLogo scrolledToTop={scrolledToTop}>
      <Image priority layout='fill' src={cmsData.logo.data.attributes.url} alt='logo' objectFit='contain' />
    </StyledLogo>
  )
}

const StyledLogo = styled.div<{ scrolledToTop: boolean }>`
  display: flex;
  align-items: center;
  user-select: none;
  position: relative;
  width: 150px;
  height: ${({ scrolledToTop }) => (scrolledToTop ? '100px' : '80px')};
`

export default Logo
