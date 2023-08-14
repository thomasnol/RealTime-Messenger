import { Router } from 'express'
import Room from '../models/Room.js'

const router = new Router()

router.get('/rooms', async (req, res) => {
  // get all rooms from MongoDB
  const rooms = await Room.find()
  res.json({ rooms })
})

export default router