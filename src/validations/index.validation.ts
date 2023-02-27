import userSchema from '../models/user.model'
import roomSchema from '../models/room.model'
import roomTypeSchema from '../models/roomtype.model'
import { NextFunction, Request, Response } from 'express'

const validateUserInputs = (req: Request, res: Response, next: NextFunction) => {
    const validateUser = userSchema.validate(req.body)

    if(validateUser.error) res.status(400).send({
        success: false,
        status: 'failed',
        errormessage: validateUser.error.details[0].message
    })
    next()
}

const validateRoomInputs = (req: Request, res: Response, next: NextFunction) => {
    const validateRoom = roomSchema.validate(req.body)

    if(validateRoom.error) res.status(400).send({
        success: false,
        status: 'failed',
        errormessage: validateRoom.error.details[0].message
    })
    next()
}


const validateRoomTypeInputs = (req: Request, res: Response, next: NextFunction) => {
    const validateRoomType = roomTypeSchema.validate(req.body)

    if(validateRoomType.error) res.status(400).send({
        success: false,
        status: 'failed',
        errormessage: validateRoomType.error.details[0].message
    })
    next()
}

export default  {validateUserInputs, validateRoomInputs, validateRoomTypeInputs} ;