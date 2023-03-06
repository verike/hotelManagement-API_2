"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const room_route_1 = __importDefault(require("../routes/room.route"));
const roomtype_route_1 = __importDefault(require("../routes/roomtype.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
router.use('/rooms', room_route_1.default);
router.use('/roomtypes', roomtype_route_1.default);
router.use('/', user_route_1.default);
exports.default = router;
