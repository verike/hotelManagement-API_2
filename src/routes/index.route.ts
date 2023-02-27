import express from 'express'
const router = express.Router()

import roomRouter from '../routes/room.route'
import roomTypeRouter from '../routes/roomtype.route'
import userRouter from '../routes/user.route'


router.use('/rooms', roomRouter)
router.use('/roomtypes', roomTypeRouter)
router.use('/', userRouter)

export default router