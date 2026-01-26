import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <header className="app-header">
      <h1 className="app-title">StockDB</h1>
      </header>
    </>
  )
}

export default App
