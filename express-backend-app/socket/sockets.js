import Room from '../models/Room.js'

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

  // socket.io rooms
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId)
  })
  socket.on("create-new-room", ({ name, roomId }) => {
    const room = new Room({
      name,
      roomId,
    })
    room.save()
    socket.broadcast.emit("create-new-room", { room })
  })
  socket.on("delete-room", async ({ roomId }) => {
    // console.log("deleting-room", roomId)
    await Room.deleteOne({ roomId })
    socket.emit("delete-room", { roomId })
    socket.broadcast.emit("delete-room", { roomId })
  })
}

export default sockets