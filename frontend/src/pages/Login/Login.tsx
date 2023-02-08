import { useState, useEffect, useRef } from 'react'
import useAuth from '@/hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import cmsApi from '@/api/cmsApi'
import { Auth, loginResponse } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { boolToString } from '@/utils/helpers'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const LOGIN_URL = '/auth'

const loginFn = async (props: Auth) => {
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
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
    console.log('persist value:', persist)
    localStorage.setItem('persist', boolToString(persist))
  }, [persist])

  const togglePersist = () => {
    setPersist((persist) => {
      if (typeof persist === 'boolean') {
        return !persist
      }
      return persist
    })
  }

  const togglePassword = () => {
    setShowPassword((showPassword) => {
      if (typeof showPassword === 'boolean') {
        return !showPassword
      }
      return showPassword
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await mutate.mutateAsync({
        userName,
        password,
        roles: [],
        accessToken: '',
        rolesList: {
          Admin: 5150,
          User: 2001,
          Editor: 1984,
        },
        isAuthorized: false,
      })
      const roles = data.roles
      const accessToken = data.accessToken
      const rolesList = data.rolesList
      const isAuthorized = data.isAuthorized

      console.log(data)

      console.log('roles: ', roles)
      console.log('accessToken: ', accessToken)

      mutate.mutate({
        userName,
        password,
        roles,
        accessToken,
        rolesList,
        isAuthorized,
      })

      setAuth({
        userName,
        password,
        roles,
        accessToken,
        rolesList,
        isAuthorized,
      })
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
    <header className='flex flex-col items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center w-72 sm:w-96'
      >
        <h1 className='text-3xl font-bold'>Login</h1>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='user' className='text-sm font-bold'>
              Username
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
            <div className='w-full flex items-center'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                className='absolute w-8 h-8 translate-x-[16rem] sm:translate-x-[22rem]'
                onClick={togglePassword}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className='w-6 h-6 text-blue-500' />
                ) : (
                  <AiFillEye className='w-6 h-6 text-blue-500' />
                )}
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between w-full mt-4'>
            <div className='flex items-center'>
              <input
                id='persist'
                type={'checkbox'}
                className='w-4 h-4 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                checked={
                  boolToString(persist) === 'true'
                    ? true
                    : persist === true
                    ? true
                    : false
                }
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
    </header>
  )
}

export default Login
