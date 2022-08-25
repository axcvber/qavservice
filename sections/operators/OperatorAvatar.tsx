import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import Box from '../../styles/layout/Box'

interface IOperatorAvatar {
  avatarUrl: string
  alt: string
}

const OperatorAvatar: React.FC<IOperatorAvatar> = ({ avatarUrl, alt }) => {
  return (
    <StyledAvatar display='flex' minWidth={'170px'} overflow='hidden' boxShadow='10px 10px 20px -10px rgba(0,0,0,0.75)'>
      <Image priority width={170} height={170} src={avatarUrl} alt={alt} placeholder='blur' blurDataURL={avatarUrl} />
    </StyledAvatar>
  )
}

const StyledAvatar = styled(Box)`
  border-image-slice: 1;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.turquoise}, ${({ theme }) => theme.colors.pink})
    border-box;
  border-radius: 20px;
  border: 3px solid transparent;
`

export default OperatorAvatar
