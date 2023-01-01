import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Layout from '@/components/Layout'
import Dog from '@/components/Dog'
import Populations from '@/components/Populations'
import Content from '@/components/Content'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

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
      <Route path='/' element={<Layout />}>
        <Route index element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dog' element={<Dog />} />
        <Route path='/population' element={<Populations />} />
      </Route>
    )
  )

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
