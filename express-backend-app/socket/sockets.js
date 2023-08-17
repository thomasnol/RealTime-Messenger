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
  socket.on("create-new-room", ({ roomId, userId }) => {
    const room = new Room({
      name: 'Test Room',
      roomId: roomId,
      userId: userId,
    })
    room.save()
    socket.emit("create-new-room", { room })
  })
  socket.on("delete-room", async ({ roomId }) => {
    // find room by roomId in database and delete room
    await Room.deleteOne({ roomId: roomId })
    socket.emit("delete-room", { roomId })
  })
}

export default sockets