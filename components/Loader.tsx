import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loader: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {loading && (
        <StyledLoader
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <CSSLoader>
            <div className='cssload-inner cssload-one'></div>
            <div className='cssload-inner cssload-two'></div>
            <div className='cssload-inner cssload-three'></div>
          </CSSLoader>
          <LoaderTitle>Загрузка...</LoaderTitle>
        </StyledLoader>
      )}
    </AnimatePresence>
  )
}

export default Loader

const LoaderTitle = styled.h1`
  color: ${({ theme }) => theme.palette.text.secondary};
  ${({ theme }) => theme.fonts.OswaldBold};
  text-transform: uppercase;
  font-size: 20px;
`

const cssloadRotateOne = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
`
const cssloadRotateTwo = keyframes`
 0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
`

const cssloadRotateThree = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
`

const CSSLoader = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 30px 0;
  perspective: 780px;
  .cssload-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-radius: 50%;
    -o-border-radius: 50%;
    -ms-border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    &.cssload-one {
      left: 0%;
      top: 0%;
      animation: ${cssloadRotateOne} 1.15s linear infinite;
      border-bottom: 3px solid ${({ theme }) => theme.palette.primary};
    }
    &.cssload-two {
      right: 0%;
      top: 0%;
      animation: ${cssloadRotateTwo} 1.15s linear infinite;
      border-right: 3px solid ${({ theme }) => theme.palette.primary};
    }
    &.cssload-three {
      right: 0%;
      bottom: 0%;
      animation: ${cssloadRotateThree} 1.15s linear infinite;
      border-top: 3px solid ${({ theme }) => theme.palette.primary};
    }
  }
`
const StyledLoader = styled(motion.div)`
  background: #131313;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  z-index: 99999;
`
