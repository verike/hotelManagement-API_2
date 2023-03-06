"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const index_validation_1 = __importDefault(require("../validations/index.validation"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
router.post('/register', index_validation_1.default.validateUserInputs, user_controller_1.default.createUser);
router.get('/:username', user_controller_1.default.fetchOne);
router.patch('/:username', user_controller_1.default.editUser);
router.get('/users', auth_middleware_1.default, user_controller_1.default.fetch);
router.delete('/:username', user_controller_1.default.deleteUser);
exports.default = router;
