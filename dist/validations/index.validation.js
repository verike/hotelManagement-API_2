"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const roomtype_model_1 = __importDefault(require("../models/roomtype.model"));
const validateUserInputs = (req, res, next) => {
    const validateUser = user_model_1.default.validate(req.body);
    if (validateUser.error)
        res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateUser.error.details[0].message
        });
    next();
};
const validateRoomInputs = (req, res, next) => {
    const validateRoom = room_model_1.default.validate(req.body);
    if (validateRoom.error)
        res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateRoom.error.details[0].message
        });
    next();
};
const validateRoomTypeInputs = (req, res, next) => {
    const validateRoomType = roomtype_model_1.default.validate(req.body);
    if (validateRoomType.error)
        res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateRoomType.error.details[0].message
        });
    next();
};
exports.default = { validateUserInputs, validateRoomInputs, validateRoomTypeInputs };
