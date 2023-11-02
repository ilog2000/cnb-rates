import * as config from '../src/configuration.json'
import { fetchExchangeData } from '../src/services/CNB'

describe('CNB service tests', () => {
  test('Test fetchExchangeData function', async () => {
    const result = await fetchExchangeData(config.CNB_URL)
    console.log(result)
    expect(result.length).toBeGreaterThan(0)
  })
})
