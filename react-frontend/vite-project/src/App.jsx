import React from 'react'

import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import 'bootstrap/dist/css/bootstrap.min.css'

import Button from '@mui/material/Button';


function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:8000"))
  },[])

  // Fetching message from backend
  // const [message, setMessage] = useState("")
  //useEffect(() => {
    //fetch("https://mern-webapp-9f68.onrender.com")
    //fetch("http://localhost:8000")
      //.then((res) => res.json())
      //.then((data) => setMessage(data.message));
  //}, []);

  return (
    <div> React Frontend
      <Button variant="text">Text</Button>
    </div>
  )
}

export default App
