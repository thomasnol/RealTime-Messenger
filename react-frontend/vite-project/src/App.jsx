import React from 'react'

import { useState, useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [message, setMessage] = useState("")

  // Fetching message from backend
  useEffect(() => {
    //fetch("https://mern-webapp-9f68.onrender.com")
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      
    </div>
  )
}

export default App
