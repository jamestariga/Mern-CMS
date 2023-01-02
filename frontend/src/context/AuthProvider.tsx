import { createContext, ReactNode, useState } from 'react'
import { ContextInterface } from '@/types/types'

const AuthContext = createContext<ContextInterface>({} as ContextInterface)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{}>({})
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('persist') || '') || false
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
