import './App.css'
import { QueryClient, QueryClientProvider } from "react-query"
import { MantineProvider } from '@mantine/core'
import { Converter } from './components/Converter/Converter'

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider  defaultColorScheme="light">
        <Converter />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
