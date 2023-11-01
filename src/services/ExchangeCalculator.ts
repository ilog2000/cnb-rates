import { Currency } from '../models/Currency'
import { ExchangeData } from '../models/ExchangeData'

export class ExchangeCalculator {
  constructor(private exchangeData: ExchangeData) {
    this.exchangeData = exchangeData
  }

  public toCZK(amount: number, from: Currency): number {
    const fromRate = this.exchangeData.rates.get(from)
    if (fromRate === undefined) {
      throw new Error(`Invalid currency: ${from}`)
    }
    return amount * (fromRate.rate / fromRate.amount)
  }

  public fromCZK(amount: number, to: Currency): number {
    const toRate = this.exchangeData.rates.get(to)
    if (toRate === undefined) {
      throw new Error(`Invalid currency: ${to}`)
    }
    return amount / (toRate.rate / toRate.amount)
  }

  public convert(amount: number, from: Currency, to: Currency): number {
    const fromRate = this.exchangeData.rates.get(from)
    const toRate = this.exchangeData.rates.get(to)
    if (fromRate === undefined || toRate === undefined) {
      throw new Error(`Invalid currency: ${from} or ${to}`)
    }
    if (from === 'CZK') {
      return this.fromCZK(amount, to)
    } else if (to === 'CZK') {
      return this.toCZK(amount, from)
    }
    const czkAmount = this.toCZK(amount, from)
    return this.fromCZK(czkAmount, to)
  }
}
