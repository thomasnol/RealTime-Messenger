import { Router } from 'express'
import Room from '../models/Room.js'

const router = new Router()

router.get('/rooms', (req, res) => {
  // get all rooms from MongoDB
  const rooms = Room.find()
  res.json({ rooms })
})

export default router