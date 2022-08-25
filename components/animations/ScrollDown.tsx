import React from 'react'
import styled, { keyframes } from 'styled-components'

const ScrollDown = () => {
  return (
    <Wrapper>
      <svg className='arrows'>
        <path className='a1' d='M0 0 L20 22 L40 0'></path>
        <path className='a2' d='M0 20 L20 42 L40 20'></path>
        <path className='a3' d='M0 40 L20 62 L40 40'></path>
      </svg>
    </Wrapper>
  )
}

const arrow = keyframes`
  0% {opacity:0}
  40% {opacity:1}
  80% {opacity:0}
  100% {opacity:0}
`

const Wrapper = styled.div`
  .arrows {
    width: 40px;
    height: 64px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    z-index: 9;
    path {
      stroke: ${({ theme }) => theme.colors.pink};
      fill: transparent;
      stroke-width: 3px;
      animation: ${arrow} 2s infinite;
    }
    .a1 {
      animation-delay: -1s;
    }
    .a2 {
      animation-delay: -0.5s;
    }
    .a3 {
      animation-delay: 0s;
    }
  }
`

export default ScrollDown
