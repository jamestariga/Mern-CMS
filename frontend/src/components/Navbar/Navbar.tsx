import { useState, useEffect } from 'react'
import useEventListener from '@/hooks/useEventListener'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const { auth } = useAuth()

  const handleScroll = () => {
    if (window.innerWidth > 1020) {
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
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <HiOutlineMenuAlt1 className='h-6 w-6 text-blue-500' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
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
            </ul>
          </div>
          <a className='btn btn-ghost text-3xl ml-4 text-white xl:ml-12'>
            ECOM
          </a>
        </div>
        <div className='navbar-center hidden lg:flex lg:w-5/6'>
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
      </nav>
    </>
  )
}

export default NavBar
