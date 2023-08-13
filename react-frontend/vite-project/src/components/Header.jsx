import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
  const navigate = useNavigate();
  
  function createNewRoom() {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`)
  }

  return (
    <Card sx={{marginTop: 3, backgroundColor: "gray"}} raised>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Box>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button sx={{color: "white"}} variant="text">Home</Button>
          </Link>
        </Box>
        {/* <Link style={{ textDecoration: "none" }} to={`/room/${roomId}`}>
          <Button sx={{color: "white"}} variant="text">Room</Button>
        </Link> */}
        <Button sx={{color: "white"}} variant="text" onClick={createNewRoom}>
          New Room
        </Button>
      </Box>
    </Card>
  )
}
