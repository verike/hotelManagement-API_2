import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import express from 'express'
const loginRouter = express.Router()
import UserModel from '../models/user.model'

loginRouter.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body

    const validUser = await UserModel.findOne({username: username})
    const validPassword = await bcrypt.compare(password, validUser.password)

    if(!validUser && !validPassword) {
        return res.status(401).send({
            error: 'invalid username or password',
            status: 'failed'
        })
    }

    const useForToken = {
        username: validUser.username,
        id: validUser._id
    }

    const token = jwt.sign(useForToken, process.JWT_SECRET)

    res.status(200).send({
        token: token,
        username: validUser,
        fullname: validUser.fullname,
        message: 'You have logged in successfully!'
    })

})

export default loginRouter;