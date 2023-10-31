import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Converter } from './components/Converter/Converter'

const queryClient = new QueryClient({})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Converter />
    </QueryClientProvider>
  )
}

export default App
