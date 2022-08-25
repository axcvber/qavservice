import React, { ReactChild } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../styles/global'
import { theme } from '../styles/theme'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout: React.FC<{ children: ReactChild }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer
        theme='colored'
        transition={Bounce}
        position='bottom-left'
        closeOnClick={false}
        pauseOnHover={false}
        limit={2}
        autoClose={3000}
      />
      <main style={{ overflow: 'hidden' }}>{children}</main>
    </ThemeProvider>
  )
}

export default Layout
