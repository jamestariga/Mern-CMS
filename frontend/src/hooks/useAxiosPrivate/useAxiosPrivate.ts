import { useEffect } from 'react'
import { cmsApiPrivate } from '@/api/cmsApi'
import useRefreshToken from '@/hooks/useRefreshToken'
import useAuth from '@/hooks/useAuth'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestInterceptor = cmsApiPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    console.log('useAxiosPrivate' + auth?.accessToken)

    const responseInterceptor = cmsApiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return cmsApiPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      cmsApiPrivate.interceptors.request.eject(requestInterceptor)
      cmsApiPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [auth, refresh])

  return cmsApiPrivate
}

export default useAxiosPrivate
