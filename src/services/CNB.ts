import config from '../config.json'
import { Currency } from '../models/Currency'
import { ExchangeData, ExchangeRate } from '../models/ExchangeData'

export function parseTextData(textData: string): ExchangeData {
  const lines = textData.split('\n')
  const [date, idx] = lines[0].split(' #')
  const rates = new Map<Currency, ExchangeRate>()

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
export async function fetchExchangeData(): Promise<ExchangeData> {
  const url = config.cnbURL
  const response = await fetch(url)
  const textData = await response.text()
  return parseTextData(textData)
}

export function setLocalExchangeData(data: ExchangeData) {
  localStorage.setItem('exchangeData', JSON.stringify(data))
}

export function getLocalExchangeData(): ExchangeData | null {
  const data = localStorage.getItem('exchangeData')
  if (data === null) {
    return null
  }
  return JSON.parse(data)
}
