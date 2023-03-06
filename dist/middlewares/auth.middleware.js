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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = __importDefault(require("../services/user.service"));
const authoriseAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_service_1.default.fetchOne({ username: username });
    const authenticate = yield bcrypt_1.default.compare(password, user.password);
    if (user && authenticate) {
        if (user.role === 'admin') {
            res.status(200).send({
                success: true,
                message: 'action authorised',
                status: 'admin'
            });
            next();
        }
        else {
            res.status(403).send({
                success: false,
                message: 'action unauthorised',
                status: 'guest'
            });
        }
    }
});
exports.default = authoriseAdmin;
