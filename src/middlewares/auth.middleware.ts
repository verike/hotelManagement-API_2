import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '../services/user.service'

const authoriseAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const user = await UserService.fetchOne({username: username})

    const authenticate = await bcrypt.compare(password, user.password)

    if (user && authenticate){
        if(user.role === 'admin'){
            res.status(200).send({
                success: true,
                message: 'action authorised',
                status: 'admin'
            })
            next()
        } else {
            res.status(403).send({
                success: false,
                message: 'action unauthorised',
                status: 'guest'
            })
        }
    }

}

export default authoriseAdmin