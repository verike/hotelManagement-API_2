"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const index_validation_1 = __importDefault(require("../validations/index.validation"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const login_route_1 = __importDefault(require("../routes/login.route"));
const router = express_1.default.Router();
router.use(login_route_1.default);
router.post('/create', index_validation_1.default.validateRoomInputs, auth_middleware_1.default, room_controller_1.default.createRoom);
router.get('/:id', room_controller_1.default.fetchOne);
router.patch('/:id', auth_middleware_1.default, room_controller_1.default.updateRoom);
router.get('/', room_controller_1.default.fetch);
router.delete('/:id', auth_middleware_1.default, room_controller_1.default.deleteRoom);
exports.default = router;
