import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
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
        <Route index element={<Content />} />
        <Route path='/dog' element={<Dog />} />
        <Route path='/population' element={<Populations />} />
      </Route>
    )
  )

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
