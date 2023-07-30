import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  // setting up socket
  useEffect(() => {
    setSocket(io("http://localhost:4000"))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('message-broadcast', (data) => {
      console.log("message recieved", data)
      setChat((prev) => [...prev, data.message])
    })
  }, [socket])

  const handleForm = (e) => {
    e.preventDefault()
    socket.emit("send-message", { message })
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
      <Container>
        <Box sx={{ marginY: 2, marginLeft: 2}}>
          {chat.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </Box>
      </Container>
      <Box sx={{marginLeft: 5}} component="form" onSubmit={handleForm}>
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
