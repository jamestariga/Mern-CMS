import { useState, useEffect } from 'react'
import useEventListener from '@/hooks/useEventListener'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useLogout from '@/hooks/useLogout'

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { auth } = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleScroll = () => {
    if (window.innerWidth > 0) {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
  }

  useEventListener('scroll', handleScroll)

  const isAuthorized = auth.isAuthorized

  console.log('isAuthorized', isAuthorized)

  return (
    <>
      <nav
        className={`navbar py-6 fixed transition z-50 ${
          isScrolled ? `bg-indigo-900` : `bg-base-100`
        }`}
      >
        <div className='navbar-start'>
          <div className='dropdown'>
            <div className='sm:pl-8'>
              <button
                onClick={handleMenuClick}
                className='btn btn-ghost lg:hidden'
              >
                <HiOutlineMenuAlt1 className='h-6 w-6 text-blue-500' />
              </button>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className='menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52'
              >
                <li tabIndex={0}>
                  <NavLink
                    to='/admin'
                    className={({ isActive }) =>
                      isActive ? `bg-blue-700 text-white` : `text-gray-400`
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                {isAuthorized && (
                  <li>
                    <NavLink
                      to='/admin'
                      className={({ isActive }) =>
                        isActive ? `bg-blue-700 text-white` : `text-gray-400`
                      }
                    >
                      Admin
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to='/login'
                    className={({ isActive }) =>
                      isActive ? `bg-blue-700 text-white` : `text-gray-400`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <button
                    className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            )}
          </div>
          <a className='btn btn-ghost text-3xl ml-4 text-white xl:ml-12'>
            ECOM
          </a>
        </div>
        <div className='navbar-center hidden lg:flex lg:w-9/12'>
          <ul className='menu menu-horizontal p-0 text-xl font-bold space-x-6'>
            <li tabIndex={0}>
              <NavLink
                to='/home'
                className={({ isActive }) =>
                  isActive ? `bg-blue-700 text-white` : `text-gray-400`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  isActive ? `bg-blue-700 text-white` : `text-gray-400`
                }
              >
                Login
              </NavLink>
            </li>
            {isAuthorized && (
              <li>
                <NavLink
                  to='/admin'
                  className={({ isActive }) =>
                    isActive ? `bg-blue-700 text-white` : `text-gray-400`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className='hidden lg:flex lg:justify-end w-full lg:w-2/6 px-8'>
          <button
            className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </nav>
    </>
  )
}

export default NavBar
