import { Router } from 'express'
import Room from '../models/Room.js'

const router = new Router()

router.get('/rooms', async (req, res) => {
  // get all rooms from MongoDB
  const rooms = await Room.find()
  res.json({ rooms })
})
router.delete('/rooms/:roomId', async (req, res) => {
  // delete room from MongoDB
  await Room.deleteOne({ roomId: req.params.roomId })
  res.json({ data: { message: 'Room deleted' }})
})

export default router