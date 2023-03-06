"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// creating roomtype database collection model
const roomtypeSchema = new mongoose_1.Schema({
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
});
const RoomType = (0, mongoose_1.model)('roomtype', roomtypeSchema);
exports.default = RoomType;
