import React, { useEffect } from 'react'
import { io } from "socket.io-client"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'


function App() {
  /*
  Fetching message from backend
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetch("https://mern-webapp-9f68.onrender.com")
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  */

  // setting up socket
  useEffect(() => {
    setSocket(io("http://localhost:4000"))
  }, [])
  
  return (
    <div>
      <Container>
        <Header />
        <Box sx={{ display:"flex", justifyContent:"center" }}>
          <Outlet />
        </Box>
      </Container>
    </div>
  )
}

export default App
