import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Results } from './components/Results'

export function App() {
  const [conversionResults, setConversionResults] = useState({ rates: [] })
  const [amount, setAmount] = useState(1)
  const userInput = document.getElementById('input')

  // The base currency is EUR and due to our free subscription we cannot change that.
  // So, I tried to reuse the USD rate that comes from the API and set that as the base (amount).
  // I can get an array that has the USD rate through the following block
  const usd = Object.entries(conversionResults).filter(([currencyCode]) => {
    return currencyCode === 'USD'
  })
  // After the page initially loads, I can uncomment the below line to get the value
  // console.log(usd[0][1])
  // However, because the value is initially undefined, I can't seem to use it correctly.
  // Attempts are either met with errors of it being undefined, or too many rerenders if I try a function

  useEffect(async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=798f91ead8b8753d3a6923eefea7c7b1`
    )
    setConversionResults(response.data.rates)
  }, [])

  function checkInput() {
    if (isNaN(userInput.valueAsNumber) || userInput.valueAsNumber < 0) {
      alert('Must input positive numbers')
      return
    }
    setAmount(userInput.valueAsNumber)
  }

  return (
    <>
      <header>
        <h1>Currency Conversion Calculator</h1>
        <p>Kindly contribute cash count (EUR) to convert</p>
        <input id="input" type="number"></input>
        <button onClick={checkInput}>Convert</button>
      </header>
      <Results cRes={conversionResults} amnt={amount} />
    </>
  )
}
