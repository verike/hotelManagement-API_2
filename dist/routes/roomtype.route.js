"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomtype_controller_1 = __importDefault(require("../controllers/roomtype.controller"));
const index_validation_1 = __importDefault(require("../validations/index.validation"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post('/create', index_validation_1.default.validateRoomTypeInputs, auth_middleware_1.default, roomtype_controller_1.default.createRoomType);
router.get('/:name', roomtype_controller_1.default.fetchOne);
router.patch('/:name', auth_middleware_1.default, roomtype_controller_1.default.editRoomType);
router.get('/', roomtype_controller_1.default.fetchAll);
router.delete('/:name', auth_middleware_1.default, roomtype_controller_1.default.deleteRoomType);
exports.default = router;
