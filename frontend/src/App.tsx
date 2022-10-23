import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Dog from './components/Dog'
import Populations from './components/Populations'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <Dog /> */}
        <Populations />
      </div>
    </QueryClientProvider>
  )
}

export default App
