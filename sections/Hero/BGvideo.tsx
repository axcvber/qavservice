import React from 'react'
import styled from 'styled-components'

const BGvideo: React.FC<{ bgUrl: string }> = ({ bgUrl }) => {
  return (
    <>
      <VideoBG>
        <video muted playsInline autoPlay loop>
          <source src={bgUrl} type='video/mp4' />
        </video>
      </VideoBG>
    </>
  )
}

export default BGvideo

const VideoBG = styled.div`
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 1) 100%
      ),
      rgba(0, 0, 0, 0.2);
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
