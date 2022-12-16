import { Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'

const Wrapper = ({ children }: any) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

  return children
}

const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

export default Layout
