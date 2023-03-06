import express from "express"
import RoomController from "../controllers/room.controller"
import index from '../validations/index.validation'
import authoriseAdmin from '../middlewares/auth.middleware'
import loginRouter from "../routes/login.route"

const router = express.Router()

router.use(loginRouter)
router.post('/create', index.validateRoomInputs, authoriseAdmin, RoomController.createRoom)
router.get('/:name', RoomController.fetchOne)
router.patch('/:name', authoriseAdmin, RoomController.updateRoom)
router.get('/', RoomController.fetch)
router.delete('/:name', authoriseAdmin, RoomController.deleteRoom)

export default router;