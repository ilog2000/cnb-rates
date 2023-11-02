import { Currency } from '../models/Currency'
import { ExchangeData, ExchangeRate } from '../models/ExchangeData'

export function parseTextData(textData: string): ExchangeData {
  if (textData === '') {
    throw new Error('Empty CNB response')
  }
  const lines = textData.split('\n')
  const [date, idx] = lines[0].split(' #')
  const rates = new Map<Currency, ExchangeRate>()

  rates.set('CZK', {
    country: 'Česká republika',
    currencyName: 'Koruna česká',
    currencyCode: 'CZK',
    amount: 1,
    rate: 1,
  })

  // Skip lines[1] containing the header
  for (let i = 2; i < lines.length; i++) {
    const [country, currencyName, amount, currencyCode, rate] = lines[i].split('|')
    const currency = currencyCode as Currency
    const exchangeRate: ExchangeRate = {
      country,
      currencyName,
      currencyCode,
      amount: parseFloat(amount),
      rate: parseFloat(rate),
    }
    rates.set(currency, exchangeRate)
  }

  return {
    date: new Date(date).toISOString(),
    idx: parseInt(idx),
    rates,
  }
}
export async function fetchExchangeData(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'text/plain' },
    })
    const textData = await response.text()
    console.log('CNB response:', textData)
    return textData
  } catch (error) {
    throw new Error(`Failed to fetch exchange data: ${error}`)
  }
}

export function setLocalExchangeData(data: ExchangeData) {
  localStorage.setItem('exchangeData', JSON.stringify(data))
}

export function getLocalExchangeData(): ExchangeData | null {
  const data = localStorage.getItem('exchangeData')
  if (data === null) {
    return null
  }
  return JSON.parse(data) as ExchangeData
}
