import express from "express"
import RoomTypeController from "../controllers/roomtype.controller"
import index from '../validations/index.validation'
import authoriseAdmin from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/create', index.validateRoomTypeInputs, authoriseAdmin, RoomTypeController.createRoomType)
router.get('/:name', RoomTypeController.fetchOne)
router.patch('/:name', authoriseAdmin, RoomTypeController.editRoomType)
router.get('/', RoomTypeController.fetchAll)
router.delete('/:name', authoriseAdmin, RoomTypeController.deleteRoomType)

export default router;