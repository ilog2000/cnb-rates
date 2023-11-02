import { useRef, useState } from 'react'
import classes from './Converter.module.css'
import { Currencies, Currency } from '../../models/Currency'
import { ConverterFormData } from '../../models/ConverterFormData'
import { ExchangeCalculator } from '../../services/ExchangeCalculator'
import { useExchangeData } from '../../hooks/ExchangeDataHook'

function getFormInput(form: HTMLFormElement, name: string): HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
  const inputField = form.elements.namedItem(name)
  if (!inputField || !('value' in inputField)) {
    throw new Error(`Form input "${name}" not found`)
  }
  if (
    inputField instanceof HTMLInputElement ||
    inputField instanceof HTMLSelectElement ||
    inputField instanceof HTMLButtonElement
  ) {
    return inputField as HTMLInputElement | HTMLSelectElement | HTMLButtonElement
  }
  throw new Error(`Form input "${name}" is not supported`)
}

export function Converter() {
  const exchangeData = useExchangeData()

  type ValidationErrors = Partial<Record<keyof ConverterFormData, string>>
  const [errors, setErrors] = useState<ValidationErrors>({})
  type Touched = Partial<Record<keyof ConverterFormData, boolean>>
  const [touched, setTouched] = useState<Touched>({})

  const [formData, setFormData] = useState<ConverterFormData>({ amount: '', currencyFrom: 'CZK', currencyTo: 'EUR' })

  const divResult = useRef<HTMLDivElement>(null)

  function validate(modifiedFormData: ConverterFormData): ValidationErrors {
    const validationErrors: ValidationErrors = {}

    const msg = 'Please enter a valid number.'
    if (!modifiedFormData.amount) {
      validationErrors.amount = msg
    } else {
      const amount = parseFloat(modifiedFormData.amount)
      if (!Number.isFinite(amount) || amount <= 0) {
        validationErrors.amount = msg
      }
    }

    return validationErrors
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    setErrors(validate({ ...formData, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const amount = getFormInput(event.currentTarget, 'amount')
    const currencyFrom = getFormInput(event.currentTarget, 'currencyFrom')
    const currencyTo = getFormInput(event.currentTarget, 'currencyTo')

    const calculator = new ExchangeCalculator(exchangeData)
    const amountToConvert = parseFloat(amount.value)
    const from = currencyFrom.value as Currency
    const to = currencyTo.value as Currency
    const result = calculator.convert(amountToConvert, from, to)

    divResult.current!.innerHTML = result.toFixed(2)
    divResult.current!.classList.add(classes.outlined)
  }

  return (
    <div className={classes.converter}>
      <h2>Currency Converter</h2>
      <small>using Czech National Bank exchange rates</small>
      <hr />
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
          <label>Enter amount to convert and select currency:</label>
          <input
            type="text"
            name="amount"
            id="amount"
            placeholder="0.0"
            autoFocus
            tabIndex={0}
            value={formData.amount}
            onChange={handleInputChange}
            onBlur={() => setTouched({ ...touched, amount: true })}
          />
          <select
            name="currencyFrom"
            id="currencyFrom"
            tabIndex={0}
            value={formData.currencyFrom}
            onChange={handleInputChange}
          >
            {Currencies.map((currency, i) => (
              <option key={i} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span>to</span>
          <select
            name="currencyTo"
            id="currencyTo"
            tabIndex={0}
            value={formData.currencyTo}
            onChange={handleInputChange}
          >
            {Currencies.map((currency, i) => (
              <option key={i} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <button type="submit" className={classes.button} tabIndex={0}>
            Convert
          </button>
        </form>
      </div>
      {errors.amount && touched.amount ? <p className={classes.error}>{errors.amount}</p> : null}
      <div id="conversionResult" className={classes.conversionResult} ref={divResult}></div>
    </div>
  )
}
