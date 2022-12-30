import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { USER_REGEX, PWD_REGEX } from '@/utils/regex'
import cmsApi from '@/api/cmsApi'
import { registerResponse, registerUser } from '@/types/types'

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

  const [firstName, setFirstName] = useState<string>('')

  const [lastName, setLastName] = useState<string>('')

  const [matchPassword, setMatchPassword] = useState<string>('')
  const [validMatchPassword, setValidMatchPassword] = useState<boolean>(false)
  const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false)

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
    <header>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center space-y-4'
      >
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            ref={userRef}
          />
          {userFocus && !validUserName && (
            <p>Username must be at least 6 characters long</p>
          )}
        </div>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='flex'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            ref={passwordRef}
          />
          {passwordFocus && !validPassword && (
            <p>
              Password must be at least 8 characters long, contain at least one
              uppercase letter, one lowercase letter, one number, and one
              special character
            </p>
          )}
        </div>
        <div>
          <label htmlFor='matchPassword'>Confirm Password</label>
          <input
            type='password'
            id='matchPassword'
            name='matchPassword'
            value={matchPassword}
            onChange={(e) => setMatchPassword(e.target.value)}
            onFocus={() => setMatchPasswordFocus(true)}
            onBlur={() => setMatchPasswordFocus(false)}
          />
          {matchPasswordFocus && !validMatchPassword && (
            <p>Passwords do not match</p>
          )}
        </div>
        <button type='submit' disabled={mutate.isLoading}>
          {mutate.isLoading ? 'Loading...' : 'Register'}
        </button>
        <div
          tabIndex={-1}
          ref={errRef}
          aria-live='polite'
          aria-atomic='true'
          aria-relevant='all'
        >
          {error}
        </div>
      </form>
    </header>
  )
}

export default Register
