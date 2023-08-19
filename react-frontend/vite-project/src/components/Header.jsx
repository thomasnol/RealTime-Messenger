import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookies'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { v4 as uuidv4 } from 'uuid'
import { TextField } from '@mui/material'

export default function Header({socket, userId, setUserId}) {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  
  function createNewRoom() {
    let newName = ""
    const tName = document.getElementById("newRoomName").value.trim()
    if ((tName.length < 31) && (tName.length > 3 )){
      newName = tName
    } else {newName = "Unnamed Room"}
    document.getElementById('newRoomName').value = ""
    console.log("newName:" + newName)

    const roomId = uuidv4()
    navigate(`/room/${roomId}`)
    socket.emit('create-new-room', { name:newName, roomId })
    setRooms((prev) => [...prev, { name:newName, roomId }])
  }

  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("http://localhost:4000/rooms")
      // const res = await fetch("https://mern-webapp-9f68.onrender.com/rooms")
      const { rooms } = await res.json()
      setRooms(rooms)
    }
    fetchRooms()
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('create-new-room', ({ room }) => {
      setRooms((prevRooms) => [...prevRooms, room])
    })
    socket.on('delete-room', ({ roomId }) => {
      setRooms(rooms.filter(room => room.roomId !== roomId))
      if (window.location.pathname === `/room/${roomId}`) {
        navigate('/')
        window.location.reload(true)
      }
    })
  }, [socket])

  function login() {
    const userId = uuidv4()
    setUserId(userId)
    Cookies.setItem("userId", userId)
    navigate('/')
  }

  function logout() {
    setUserId(null)
    Cookies.removeItem("userId")
    navigate('/')
  }

  return (
    <>
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
          <Box>
            <Button sx={{color: "white"}} variant="text" onClick={createNewRoom}>
              New Room
            </Button>
            { userId &&
              <Button sx={{color: "white"}} variant="text" onClick={logout}>
                Logout
              </Button>
            }
            { !userId &&
              <Button sx={{color: "white"}} variant="text" onClick={login}>
                Login
              </Button>
            }
            <Link style={{ textDecoration: "none" }} to="/about">
              <Button sx={{color: "white"}} variant="text">About</Button>
            </Link>
          </Box>
        </Box>
      </Card>
      <Box sx={{display: "flex", justifyContent: "right"}}>
        <Box>
          <TextField id="newRoomName" style={{margin: 2}} inputProps={{ maxLength: 30 }}></TextField>
        </Box>
      </Box>
    </>
  )
}
