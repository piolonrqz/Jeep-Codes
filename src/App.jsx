import { useState } from 'react'
import JeepCode from './Component/JeepCode'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <JeepCode/>
      </div>
    </>
  )
}

export default App
