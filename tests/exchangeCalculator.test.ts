import { parseTextData } from '../src/services/CNB'
import { textToParse } from './mocks/cnbSample'
import { ExchangeCalculator } from '../src/services/ExchangeCalculator'

describe('ExchangeCalculator service tests', () => {
  test('Test CZK-CZK conversion', () => {
    const exchangeData = parseTextData(textToParse)
    const calculator = new ExchangeCalculator(exchangeData)
    const result = calculator.convert(100, 'CZK', 'CZK')
    expect(result.toFixed(2)).toEqual('100.00')
  })
  test('Test CZK-USD conversion', () => {
    const exchangeData = parseTextData(textToParse)
    const calculator = new ExchangeCalculator(exchangeData)
    const result = calculator.convert(100, 'CZK', 'USD')
    expect(result.toFixed(2)).toEqual('4.32')
  })
  test('Test USD-CZK conversion', () => {
    const exchangeData = parseTextData(textToParse)
    const calculator = new ExchangeCalculator(exchangeData)
    const result = calculator.convert(100, 'USD', 'CZK')
    expect(result.toFixed(2)).toEqual('2313.50')
  })
  test('Test USD-EUR conversion', () => {
    const exchangeData = parseTextData(textToParse)
    const calculator = new ExchangeCalculator(exchangeData)
    const result = calculator.convert(100, 'USD', 'EUR')
    expect(result.toFixed(2)).toEqual('94.20')
  })
  test('Test HUF-CZK conversion', () => {
    const exchangeData = parseTextData(textToParse)
    const calculator = new ExchangeCalculator(exchangeData)
    const result = calculator.convert(100, 'HUF', 'CZK')
    expect(result.toFixed(2)).toEqual('6.42')
  })
  test('Test CZK-HUF conversion', () => {
    const exchangeData = parseTextData(textToParse)
    const calculator = new ExchangeCalculator(exchangeData)
    const result = calculator.convert(100, 'CZK', 'HUF')
    expect(result.toFixed(2)).toEqual('1556.42')
  })
})
