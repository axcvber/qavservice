import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

interface IBackgroundImage {
  variant: 'left-bottom' | 'left-top' | 'right-top' | 'right-bottom' | 'end'
}

const BackgroundImage: React.FC<IBackgroundImage> = ({ variant }) => {
  const renderSwitch = (variant) => {
    switch (variant) {
      case 'left-bottom':
        return (
          <LeftBottom>
            <Image width={1000} height={1000} src='/star.png' alt='star' />
          </LeftBottom>
        )
      case 'right-top':
        return (
          <RightTop>
            <Image width={1000} height={1000} src='/star.png' alt='star' />
          </RightTop>
        )
      case 'left-top':
        return (
          <LeftTop>
            <Image width={1000} height={1000} src='/star.png' alt='star' />
          </LeftTop>
        )
      case 'right-bottom':
        return (
          <RightBottom>
            <Image width={1000} height={1000} src='/star.png' alt='star' />
          </RightBottom>
        )
      case 'end':
        return (
          <End>
            <Image width={1000} height={1000} src='/star.png' alt='star' />
          </End>
        )
      default:
        return null
    }
  }

  return <>{renderSwitch(variant)}</>
}

const LeftBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-70%, 40%) rotate(190deg);
  z-index: -1;
  opacity: 0.8;
`

const RightTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  position: absolute;
  transform: translate(70%, -20%) rotate(70deg);
  z-index: -1;
  opacity: 0.8;
`

const LeftTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-70%, -10%) rotate(190deg);
  z-index: -1;
`

const RightBottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  position: absolute;
  transform: translate(70%, 80%) rotate(70deg);
  z-index: -1;
  opacity: 0.8;
`

const End = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  position: absolute;
  transform: translate(70%, 70%) rotate(-60deg);
  z-index: -1;
  opacity: 0.8;
`

export default BackgroundImage
