import React from 'react'
import styled from 'styled-components'
import Box from '../../styles/layout/Box'

interface IBGvideo {
  bgUrl: string
  mobileBgUrl: string
}

const BGvideo: React.FC<IBGvideo> = ({ bgUrl, mobileBgUrl }) => {
  return (
    <>
      <VideoBG display={{ default: 'block', md: 'none' }}>
        <video muted playsInline autoPlay loop>
          <source src={mobileBgUrl} type='video/mp4' />
        </video>
      </VideoBG>
      <VideoBG display={{ default: 'none', md: 'block' }}>
        <video muted playsInline autoPlay loop>
          <source src={bgUrl} type='video/mp4' />
        </video>
      </VideoBG>
    </>
  )
}

export default BGvideo

const VideoBG = styled(Box)`
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 65%, rgba(127, 67, 255, 1) 100%);
  }

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
`
