const sockets = (socket) => {
  socket.on('send-message', ({message, roomId}) => {
    let skt = socket.broadcast
    skt = roomId ? skt.to(roomId) : skt
    skt.emit('message-broadcast', {message})
  })
  socket.on('start-typing', ({ roomId }) => {
    let skt = socket.broadcast
    skt = roomId ? skt.to(roomId) : skt
    skt.emit('start-typing-from-server')
  })
  socket.on('stop-typing', ({ roomId }) => {
    let skt = socket.broadcast
    skt = roomId ? skt.to(roomId) : skt
    skt.emit('stop-typing-from-server')
  })
  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  })

  // socket.io rooms
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId)
  })
  socket.on("create-new-room", ({ roomId }) => {
    socket.broadcast.emit("create-new-room", { roomId })
  })
}

export default sockets