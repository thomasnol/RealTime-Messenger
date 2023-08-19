import Typography from '@mui/material/Typography'
import React from 'react'

export default function About() {
  return (
    <Typography>
      <br/>
      This is a real time chat app built with the MERN webstack ie. MongoDB, React, Node and Express.
      It also uses Socket.io for real time communication between users.
      Messages are not persistant, so refreshing the page will clear the chat history.
      Currently the login button is a dummy login system, though it still creates a userId.
      <br/>
      Source Code: <a href="https://github.com/starlord678/RealTime-Messenger">Github</a>
    </Typography>
  )
}
