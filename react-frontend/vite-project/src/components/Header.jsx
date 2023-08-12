import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
  const roomId = uuidv4();
  return (
    <Card sx={{marginTop: 3, backgroundColor: "gray"}} raised>
      <Link style={{ textDecoration: "none" }} to="/">
        <Button sx={{color: "white"}} variant="text">Home</Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/chats">
        <Button sx={{color: "white"}} variant="text">Chats</Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to={`/room/${roomId}`}>
        <Button sx={{color: "white"}} variant="text">Room</Button>
      </Link>
    </Card>
  )
}
