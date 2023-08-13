const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomsSchema = new Schema({
  roomId: { type: String, required: true },
  messages: { type: [String], required: false },
})

export default roomsSchema