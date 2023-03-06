"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomtype_model_1 = __importDefault(require("./roomtype.model"));
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    roomtype: {
        ref: roomtype_model_1.default,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const Room = (0, mongoose_1.model)('room', roomSchema);
exports.default = Room;
