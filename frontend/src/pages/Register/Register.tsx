import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { USER_REGEX, PWD_REGEX } from '@/utils/regex'
import cmsApi from '@/api/cmsApi'
import { registerResponse, registerUser } from '@/types/types'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const registerFn = async (props: registerUser) => {
  const { userName, password, firstName, lastName } = props

  const response: registerResponse = await cmsApi.post(
    '/register',
    JSON.stringify({ userName, password, firstName, lastName }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )

  return response
}

const Register = () => {
  const [userName, setUserName] = useState<string>('')
  const [validUserName, setValidUserName] = useState<boolean>(false)
  const [userFocus, setUserFocus] = useState<boolean>(false)

  const [password, setPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [firstName, setFirstName] = useState<string>('')

  const [lastName, setLastName] = useState<string>('')

  const [matchPassword, setMatchPassword] = useState<string>('')
  const [validMatchPassword, setValidMatchPassword] = useState<boolean>(false)
  const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false)
  const [showMatchPassword, setShowMatchPassword] = useState<boolean>(false)

  const [error, setError] = useState<string>('')

  const userRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/login'

  const mutate = useMutation(registerFn, {
    onSuccess: (response) => {
      console.log(response)
      if (response.status === 200) {
        navigate(from)
      }
    },
    onError: (error: any) => {
      console.log(error)
      setError(error.message)
    },
  })

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(userName)
    console.log(`Username: ${result}`)
    console.log(userName)
    setValidUserName(result)
  }, [userName])

  useEffect(() => {
    const result = PWD_REGEX.test(password)
    console.log(result)
    console.log(`Password: ${password}`)
    setValidPassword(result)
    const match = password === matchPassword
    console.log(match)
    setValidMatchPassword(match)
  }, [password, matchPassword])

  const togglePassword = () => {
    setShowPassword((showPassword) => {
      if (typeof showPassword === 'boolean') {
        return !showPassword
      }
      return showPassword
    })
  }

  const toggleMatchPassword = () => {
    setShowMatchPassword((showMatchPassword) => {
      if (typeof showMatchPassword === 'boolean') {
        return !showMatchPassword
      }
      return showMatchPassword
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const secureUser = USER_REGEX.test(userName)
    const securePassword = PWD_REGEX.test(password)

    if (!secureUser || !securePassword) {
      setError('Invalid username or password')
      return
    }

    try {
      mutate.mutate({ userName, password, firstName, lastName })
    } catch (err: any) {
      if (!err?.response) {
        setError('Server error')
      } else if (err.response?.status === 409 || err.response?.status === 400) {
        setError(err.response?.message)
      } else {
        setError('Registration failed')
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
        <h1 className='text-3xl font-bold'>Register</h1>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='username' className='text-sm font-bold'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              ref={userRef}
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
            />
            {userFocus && !validUserName && (
              <p>Username must be at least 6 characters long</p>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='firstName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='password'>Password</label>
            <div className='w-full flex items-center'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                ref={passwordRef}
                className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
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
            {passwordFocus && !validPassword && (
              <p className='mt-4 font-bold text-sm'>
                Password must be at least 8 characters long, contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='matchPassword'>Confirm Password</label>
            <div className='w-full flex items-center'>
              <input
                type={showMatchPassword ? 'text' : 'password'}
                id='matchPassword'
                name='matchPassword'
                value={matchPassword}
                onChange={(e) => setMatchPassword(e.target.value)}
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
                className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              />
              <button
                type='button'
                className='absolute w-8 h-8 translate-x-[16rem] sm:translate-x-[22rem]'
                onClick={toggleMatchPassword}
              >
                {showMatchPassword ? (
                  <AiFillEyeInvisible className='w-6 h-6 text-blue-500' />
                ) : (
                  <AiFillEye className='w-6 h-6 text-blue-500' />
                )}
              </button>
            </div>
            {matchPasswordFocus && !validMatchPassword && (
              <p className='mt-4 font-bold text-sm'>Passwords do not match</p>
            )}
          </div>
          <button
            type='submit'
            disabled={
              !validUserName || !validPassword || !validMatchPassword
                ? true
                : false
            }
            className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          >
            {mutate.isLoading ? 'Loading...' : 'Register'}
          </button>
          <div
            ref={errRef}
            className={`flex items-center justify-center w-full mt-4 text-sm font-bold ${
              error ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {error}
          </div>
          <Link to='/login'>Already have an account?</Link>
        </div>
      </form>
    </header>
  )
}

export default Register
