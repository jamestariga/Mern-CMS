import axios from '@/api/cmsApi'
import useAuth from '@/hooks/useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth({
      roles: [],
      accessToken: '',
      refreshToken: '',
    })

    try {
      const response = await axios.get('/logout', {
        withCredentials: true,
      })
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout
