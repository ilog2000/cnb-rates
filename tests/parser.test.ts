import { parseTextData } from '../src/services/CNB'
import { textToParse } from './mocks/cnbSample'

describe('CNB service tests', () => {
  test('Test parseTextData function', () => {
    const result = parseTextData(textToParse)
    const rateUSD = result.rates.get('USD')
    expect(result.date).toEqual('2023-10-30T23:00:00.000Z')
    expect(result.idx).toEqual(210)
    expect(rateUSD?.country).toEqual('USA')
    expect(rateUSD?.currencyName).toEqual('dollar')
    expect(rateUSD?.currencyCode).toEqual('USD')
    expect(rateUSD?.amount).toEqual(1)
    expect(rateUSD?.rate).toEqual(23.135)
  })
})
