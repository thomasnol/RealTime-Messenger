import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

export default function Room() {
	const params = useParams()
	const socket = io()
	useEffect(() => {
		console.log(params)
		socket.emit('join-room', {roomId: params.roomId})
	}, [params])
  return (
    <div>Room</div>
  )
}
