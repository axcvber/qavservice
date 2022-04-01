import React, { ReactChild } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { CgCloseO } from 'react-icons/cg'
import { H3 } from '../../styles'
import { motion, AnimatePresence } from 'framer-motion'
import { useOnClickOutside } from '../../hooks/useClickOutside'

interface IModal {
  open: boolean
  onClose: () => void
  children: ReactChild
  title: string
}

const Modal: React.FC<IModal> = ({ open, onClose, children, title }) => {
  const modalRef = React.useRef(null)
  useOnClickOutside(modalRef, onClose)
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  const overlay = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  const popup = {
    hidden: {
      y: '-100vh',
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      y: '0',
      opacity: 1,
    },
  }

  const modalContent = (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <Overlay variants={overlay} initial='hidden' animate='visible' exit='hidden'>
          <Popup ref={modalRef} variants={popup}>
            <PopupHeader>
              <H3>{title}</H3>
              <CloseIcon onClick={onClose} />
            </PopupHeader>
            <PopupBody>{children}</PopupBody>
          </Popup>
        </Overlay>
      )}
    </AnimatePresence>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement)
  } else {
    return null
  }
}

export default Modal

const CloseIcon = styled(CgCloseO)`
  font-size: 22px;
  color: #fff;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  transition: fill ${({ theme }) => theme.transition};
`

const PopupBody = styled.div`
  padding: 30px 20px 15px 20px;
`

const PopupHeader = styled.div`
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary};
  padding: 0 20px;
`

const Popup = styled(motion.div)`
  width: 100%;
  max-width: 270px;
  background: ${({ theme }) => theme.palette.bg.secondary};
  border-radius: 10px;
  z-index: 99999;
  position: fixed;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.37);
  overflow: hidden;
`

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.6);
`
