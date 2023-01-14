import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '@/hooks/useRefreshToken'
import useAuth from '@/hooks/useAuth'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const refresh = useRefreshToken()
  const { auth, persist } = useAuth()

  useEffect(() => {
    const controller = new AbortController()
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        controller && setIsLoading(false)
      }
    }

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return (
    <>
      {!persist ? <Outlet /> : isLoading ? <div>Loading...</div> : <Outlet />}
    </>
  )
}

export default PersistLogin
