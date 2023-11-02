import { Currency } from './Currency'

export interface ExchangeRate {
  country: string
  currencyName: string
  currencyCode: string
  amount: number
  rate: number
}

export interface ExchangeData {
  date: string // ISO 8601, like 2023-11-01T00:00:00+01:00
  idx: number
  rates: Map<Currency, ExchangeRate>
}

export const defaultExchangeData: ExchangeData = {
  date: new Date().toISOString(),
  idx: 0,
  rates: new Map(),
}
