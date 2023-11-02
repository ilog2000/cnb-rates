import { useMemo } from 'react'
import { ExchangeData, defaultExchangeData } from '../models/ExchangeData'
import { fetchExchangeData, parseTextData } from '../services/CNB'
import { useQuery } from 'react-query'

export function useExchangeData(): ExchangeData {
  const { isError, error, data } = useQuery('exchangeData', async () => {
    // TODO: make server side API endpoint to fetch data from CNB due to CORS policy on the CNB server.
    // At the moment, the proxy in Vite server is used to overcome CORS restrictions (see vite.config.ts).
    const textDate = await fetchExchangeData('/cnb')
    const data = parseTextData(textDate)
    return data
  })

  if (isError) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Unexpected error when fetching exchange data.')
  }

  return useMemo(() => data || defaultExchangeData, [data])
}
