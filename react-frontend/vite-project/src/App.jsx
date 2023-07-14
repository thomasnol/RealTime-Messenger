import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <input type="test" placeholder="email"></input>
        <input type="password" placeholder="password"></input>
        <button>Sign in</button>

        <br/>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
          <button onClick={() => setCount((count) => count - 1)}>count is: {count}</button>
        </div>
      </div>
    </>
  )
}

export default App
