"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
const user_model_1 = __importDefault(require("../models/user.model"));
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const validUser = yield user_model_1.default.findOne({ username: username });
    const validPassword = yield bcrypt_1.default.compare(password, validUser.password);
    if (!validUser && !validPassword) {
        return res.status(401).send({
            error: 'invalid username or password',
            status: 'failed'
        });
    }
    const useForToken = {
        username: validUser === null || validUser === void 0 ? void 0 : validUser.username,
        id: validUser === null || validUser === void 0 ? void 0 : validUser._id
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(useForToken, JWT_SECRET);
    res.status(200).send({
        token: token,
        username: validUser === null || validUser === void 0 ? void 0 : validUser.username,
        fullname: validUser === null || validUser === void 0 ? void 0 : validUser.fullname,
        message: 'You have logged in successfully!'
    });
}));
exports.default = loginRouter;
