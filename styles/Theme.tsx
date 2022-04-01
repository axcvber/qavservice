import React, { ReactChild } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './global'
import { theme } from './default'
import { ModalProvider } from '../context/modalContext'
import 'react-toastify/dist/ReactToastify.css'

const Theme: React.FC<{ children: ReactChild }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer
        theme='colored'
        transition={Slide}
        position='bottom-center'
        closeOnClick={false}
        pauseOnHover={false}
        limit={2}
        autoClose={2000}
      />
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  )
}

export default Theme
