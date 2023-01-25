import axios from '@/api/cmsApi'
import useAuth from '@/hooks/useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async (): Promise<string> => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    })
    setAuth((prev: any) => {
      console.log(`Previous ${JSON.stringify(prev)}`)
      console.log(JSON.stringify(response.data.accessToken))
      return {
        ...prev,
        roles: response.data.roles,
        rolesList: response.data.rolesList,
        isAuthorized: response.data.isAuthorized,
        accessToken: response.data.accessToken,
      }
    })

    return response.data.accessToken
  }

  return refresh
}

export default useRefreshToken
