import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSocket(io("http://localhost:4000"))
  },[])

  const handleForm = (e) => {
    e.preventDefault()
    console.log(message)
    socket.emit("send-message")
    setMessage("")
  }

  // Fetching message from backend
  // const [message, setMessage] = useState("")
  //useEffect(() => {
    //fetch("https://mern-webapp-9f68.onrender.com")
    //fetch("http://localhost:8000")
      //.then((res) => res.json())
      //.then((data) => setMessage(data.message));
  //}, []);

  return (
    <div>
      <Box component="form" onSubmit={handleForm}>
        <TextField
          label="Type your message here"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="text" type="submit">Send</Button>
      </Box>
    </div>
  )
}

export default App
