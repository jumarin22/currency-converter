import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function App() {
  const [conversionResults, setConversionResults] = useState({ rates: [] })
  const [amount, setAmount] = useState(1)

  useEffect(async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=798f91ead8b8753d3a6923eefea7c7b1`
    )
    console.log(response)
    setConversionResults(response.data.rates)
  }, [])

  function convert() {
    setAmount(userInput.valueAsNumber)
  }

  const userInput = document.getElementById('input')

  return (
    <>
      <h1>Currency Conversion Calculator</h1>
      <p>Please enter USD amount</p>
      <input id="input" type="number"></input>
      <button onClick={convert}>Convert</button>
      <div className="grid">
        {Object.entries(conversionResults).map(
          ([currencyCode, conversionRate]) => {
            return (
              <p key={currencyCode}>
                {currencyCode} : {(Number(conversionRate) * amount).toFixed(2)}
              </p>
            )
          }
        )}
      </div>
    </>
  )
}
