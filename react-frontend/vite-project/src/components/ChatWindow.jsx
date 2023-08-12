import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';

import { useOutletContext, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

export default function ChatWindow() {
  const { socket } = useOutletContext()
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [typing, setTyping] = useState(false)
  const { roomId } = useParams()

  useEffect(() => {
      if (!socket) return
      socket.on('message-broadcast', (data) => {
        setChat((prev) => [...prev, {message:data.message, received:true}])
      })
      socket.on('start-typing-from-server', () => setTyping(true))
      socket.on('stop-typing-from-server', () => setTyping(false))
  }, [socket])

  const handleForm = (e) => {
      e.preventDefault()
      socket.emit("send-message", { message, roomId })
      setChat((prev) => [...prev, {message, received:false}])
      setMessage("")
  }

  const [typingTimeout, setTypingTimeout] = useState(null)

  function handleInput(e) {
      setMessage(e.target.value)
      socket.emit("start-typing", { roomId })

      if (typingTimeout) clearTimeout(typingTimeout)

      setTypingTimeout(
        setTimeout(() => {
        socket.emit("stop-typing", { roomId })
      }, 1200))
  }

  return (
  <Card
    sx={{
      padding: 2,
      marginTop: 10,
      width: "60%",
      backgroundColor:"grey",
      color:"white"
      }}>
    {roomId && <Typography>Room ID: {roomId}</Typography>}
    <Box sx={{ marginY: 2, marginLeft: 2}}>
      {chat.map((data) => (
        <Typography sx={{ textAlign: data.received ? "left" : "right" }} key={data.message}>{data.message}</Typography>
      ))}
    </Box>
    <Box sx={{marginLeft: 5}} component="form" onSubmit={handleForm}>
      {typing &&
      <Typography sx={{ textAlign: "left" }}>Typing...</Typography>}
      <OutlinedInput
        sx={{ backgroundColor:"white" }}
        fullWidth
        placeholder="Message"
        value={message}
        onChange={ handleInput }
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  </Card>
  )
}
