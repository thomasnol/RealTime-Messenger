import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { v4 as uuidv4 } from 'uuid'

export default function Header({socket}) {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  
  function createNewRoom() {
    const roomId = uuidv4()
    navigate(`/room/${roomId}`)
    setRooms((prevRooms) => [...prevRooms, roomId])
    socket.emit('create-new-room', { roomId })
  }

  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("http://localhost:4000/rooms")
      const { rooms } = await res.json()
      setRooms(rooms)
    }
    fetchRooms()
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('create-new-room', ({ roomId }) => {
      setRooms((prevRooms) => [...prevRooms, roomId])
    })
  }, [socket])

  return (
    <Card sx={{marginTop: 3, backgroundColor: "gray"}} raised>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Box>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button sx={{color: "white"}} variant="text">Home</Button>
          </Link>
          {rooms.map((room) => (
            <Link style={{ textDecoration: "none" }} to={`/room/${room.roomId}`} key={room._id}>
              <Button sx={{color: "white"}} variant="text">
                { room.name }
              </Button>
            </Link>
          ))}
        </Box>
        <Button sx={{color: "white"}} variant="text" onClick={createNewRoom}>
          New Room
        </Button>
      </Box>
    </Card>
  )
}
