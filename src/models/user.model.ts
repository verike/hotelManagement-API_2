import mongoose from "mongoose";
const Schema = mongoose.Schema;
// import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true} );

// Hashing password for tight security
// userSchema.pre('save', async (next) => {
//     if(this.password) {
//         const salt = await bcrypt.genSalt(10)
//         this.password = await bcrypt.hash(this.password, salt)
//     }
//     next()
// })

const User = mongoose.model('user', userSchema)
export default User