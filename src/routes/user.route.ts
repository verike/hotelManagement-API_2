import express from "express"
const router = express.Router()

import UserController from'../controllers/user.controller'
import index from '../validations/index.validation'
import authoriseAdmin from '../middlewares/auth.middleware'


router.post('/register', index.validateUserInputs, UserController.createUser)
router.get('/:username', UserController.fetchOne)
router.patch('/:username', UserController.editUser)
router.get('/users', authoriseAdmin, UserController.fetch)
router.delete('/:username', UserController.deleteUser)

export default router