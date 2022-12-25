import { useState } from 'react'
import useEventListener from '@/hooks/useEventListener'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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
                <a>Home</a>
              </li>
              <li>
                <a>Movies</a>
              </li>
              <li>
                <a>
                  Shows
                  <FaChevronRight className='h-4 w-4 text-blue-500' />
                </a>
                <ul className='p-2'>
                  <li>
                    <a>Series</a>
                  </li>
                  <li>
                    <a>Others</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
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
                to='/'
                className={({ isActive }) =>
                  isActive ? `bg-blue-700 text-white` : `text-gray-400`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <a>Movies</a>
            </li>
            <li>
              <NavLink
                to='/dog'
                className={({ isActive }) =>
                  isActive ? `bg-blue-700 text-white` : `text-gray-400`
                }
              >
                Dog
                <FaChevronDown
                  className={`h-4 w-4 ${
                    isScrolled ? `text-blue-400` : `text-blue-600`
                  }`}
                />
              </NavLink>
              <ul className='p-2'>
                <li>
                  <a>Series</a>
                </li>
                <li>
                  <a>Others</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar
