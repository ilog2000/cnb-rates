import { useRef, useState } from 'react'
import classes from './Converter.module.css'

interface FormData {
  amount: number
  currencyFrom?: string
  currencyTo?: string
}

export function Converter() {
  const [formData, setFormData] = useState<FormData>({ amount: 0.0, currencyFrom: 'CZK', currencyTo: 'EUR' })

  // const form = useForm({
  //   initialValues: {
  //     amount: '0',
  //   },

  //   validate: {
  //     amount: (value) => (/^\d*$/.test(value) ? null : 'Invalid email'),
  //   },
  // })

  const divResult = useRef<HTMLDivElement>(null)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(event.currentTarget.elements)
    console.log(event.currentTarget.elements[0])
    divResult.current!.innerHTML = '100'
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
            placeholder="0.0"
            autoFocus
            tabIndex={0}
            value={formData.amount}
            onChange={handleInputChange}
          />
          <select
            name="currencyFrom"
            id="currencyFrom"
            tabIndex={0}
            value={formData.currencyFrom}
            onChange={handleInputChange}
          >
            <option value="CZK">CZK</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
          <select
            name="currencyTo"
            id="currencyTo"
            tabIndex={0}
            value={formData.currencyTo}
            onChange={handleInputChange}
          >
            <option value="CZK">CZK</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
          <button type="submit" className={classes.button} tabIndex={0}>
            Convert
          </button>
        </form>
      </div>
      <div id="conversionResult" className={classes.conversionResult} ref={divResult}></div>
    </div>
  )
}
