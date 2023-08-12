import React, { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow.jsx'

export default function Room() {
	const { socket } = useOutletContext()
	const params = useParams()
	useEffect(() => {
		if (!socket) return
		socket.emit('join-room', {roomId: params.roomId})
	}, [socket])
  return <ChatWindow />
}
