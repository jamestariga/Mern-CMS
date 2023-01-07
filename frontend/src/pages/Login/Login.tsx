import { useState, useEffect, useRef } from 'react'
import useAuth from '@/hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import cmsApi from '@/api/cmsApi'
import { loginUser, loginResponse } from '@/types/types'
import { useMutation } from '@tanstack/react-query'

const LOGIN_URL = '/auth'

const loginFn = async (props: loginUser) => {
  const { userName, password } = props

  const response: loginResponse = await cmsApi.post(
    LOGIN_URL,
    JSON.stringify({
      userName,
      password,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  )

  return response
}

const Login = () => {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLDivElement>(null)

  const { setAuth, persist, setPersist } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const mutate = useMutation(loginFn)

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [userName, password])

  useEffect(() => {
    localStorage.setItem('persist', persist.toString())
  }, [persist])

  const togglePersist = () => {
    setPersist((persist: boolean) => !persist)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await mutate.mutateAsync({
        userName,
        password,
        roles: [],
        accessToken: '',
      })
      const roles = data.roles
      const accessToken = data.accessToken

      console.log(data)

      console.log('roles: ', roles)
      console.log('accessToken: ', accessToken)

      mutate.mutate({ userName, password, roles, accessToken })

      setAuth({ userName, password, roles, accessToken })
      setUserName('')
      setPassword('')
      navigate(from, { replace: true })
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No Server Response')
        setError(true)
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid username or password.')
        setError(true)
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized.')
        setError(true)
      } else {
        setErrMsg('Something went wrong. Please try again.')
        setError(true)
      }
      errRef.current?.focus()
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center w-96'
      >
        <h1 className='text-3xl font-bold'>Login</h1>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='user' className='text-sm font-bold'>
              User
            </label>
            <input
              ref={userRef}
              id='user'
              type='text'
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-4'>
            <label htmlFor='password' className='text-sm font-bold'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between w-full mt-4'>
            <div className='flex items-center'>
              <input
                id='persist'
                type={'checkbox'}
                className='w-4 h-4 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                checked={persist}
                onChange={togglePersist}
              />
              <label htmlFor='persist' className='ml-2 text-sm font-bold'>
                Persist
              </label>
            </div>
            <Link to='/forgot-password' className='text-sm font-bold'>
              Forgot password?
            </Link>
          </div>
          <div
            ref={errRef}
            className={`flex items-center justify-center w-full mt-4 text-sm font-bold ${
              error ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {errMsg}
          </div>
          <button className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
