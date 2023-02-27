import {Schema, model} from 'mongoose'
import RoomType from './roomtype.model'

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    roomtype: {
        ref: RoomType,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true });

const Room = model('room', roomSchema)
export default Room