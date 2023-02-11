import React, { Suspense } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { wait } from '@/utils/helpers'
const Layout = React.lazy(() =>
  wait(1000).then(() => import('@/components/Layout'))
)
const Admin = React.lazy(() => wait(1000).then(() => import('@/pages/Admin')))
const Home = React.lazy(() => wait(1000).then(() => import('@/pages/Home')))
const Register = React.lazy(() =>
  wait(500).then(() => import('@/pages/Register'))
)
const Login = React.lazy(() => wait(500).then(() => import('@/pages/Login')))
const PersistLogin = React.lazy(() =>
  wait(1000).then(() => import('@/Container/PersistLogin'))
)
const RequireAuth = React.lazy(() =>
  wait(1000).then(() => import('@/Container/RequireAuth'))
)
import { ROLES } from '@/utils/helpers'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='/home' element={<Home />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
