import { createContext, useState } from 'react'
import { setCookie, destroyCookie } from 'nookies'
import { UsersPermissionsLoginPayload } from '../generated'

interface IAuthContext {
  userData: UsersPermissionsLoginPayload | null
  login?: (userData: UsersPermissionsLoginPayload) => void
  logout?: () => void
}
const AuthContext = createContext<Partial<IAuthContext>>({})

interface IAuthProvider {
  userData: UsersPermissionsLoginPayload | null
  children: React.ReactChild
}

const AuthProvider: React.FC<IAuthProvider> = ({ userData, children }) => {
  const [state, setState] = useState<IAuthContext>({
    userData: userData || null,
  })

  const login = (userData: UsersPermissionsLoginPayload) => {
    setCookie(null, 'jwt', userData.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    setState({
      ...state,
      userData,
    })
  }
  const logout = () => {
    destroyCookie(null, 'jwt')
    setState({
      ...state,
      userData: null,
    })
  }
  return (
    <AuthContext.Provider
      value={{
        userData: state.userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
