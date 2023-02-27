import {Schema, model} from 'mongoose'

// creating roomtype database collection model
const roomtypeSchema = new Schema ({
    name: {
        type: String,
        required: true,
        enum: ['luxury suite', 'standard suite', 'regular suite'],
        default: 'standard suite'
    },
    description: {
        type: String,
        required: true
    }
})

const RoomType = model('roomtype', roomtypeSchema)
export default RoomType;