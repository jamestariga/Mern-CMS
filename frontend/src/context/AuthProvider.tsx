import { createContext, ReactNode, useState } from 'react'
import { ContextInterface, Auth } from '@/types/types'

const AuthContext = createContext<ContextInterface>({
  auth: {
    accessToken: '',
    refreshToken: '',
    roles: [],
  },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const persistItem = localStorage.getItem('persist')
  const [auth, setAuth] = useState<Auth>({
    accessToken: '',
    refreshToken: '',
    roles: [],
  })
  const [persist, setPersist] = useState<string | boolean>(
    typeof persistItem === 'string' ? JSON.parse(persistItem) : false
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
