import React, { useState, createContext, useContext, ReactChild } from 'react'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import ResetPasswordModal from '../components/modals/ResetPasswordModal'

export enum MODAL_TYPES {
  LOGIN_MODAL = 'LOGIN_MODAL',
  REGISTER_MODAL = 'REGISTER_MODAL',
  RESET_PASS_MODAL = 'RESET_PASS_MODAL',
}

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.LOGIN_MODAL]: LoginModal,
  [MODAL_TYPES.REGISTER_MODAL]: RegisterModal,
  [MODAL_TYPES.RESET_PASS_MODAL]: ResetPasswordModal,
}

interface IModalContext {
  showModal?: (modalType: string) => void
  hideModal?: () => void
  modalType?: string
  isOpen: boolean
}

const ModalContext = createContext<Partial<IModalContext>>({})

const ModalProvider: React.FC<{ children: ReactChild }> = ({ children }) => {
  const [state, setState] = useState<IModalContext>({
    modalType: '',
    isOpen: false,
  })

  const showModal = (modalType: string) => {
    setState({
      ...state,
      modalType,
      isOpen: true,
    })
  }

  const hideModal = () => {
    setState({
      ...state,
      isOpen: false,
    })
  }

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[state.modalType]
    if (!ModalComponent) {
      return null
    }
    return <ModalComponent />
  }

  return (
    <ModalContext.Provider value={{ isOpen: state.isOpen, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
