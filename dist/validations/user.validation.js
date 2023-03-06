"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    fullname: joi_1.default.string().required(),
    username: joi_1.default.string().required().lowercase(),
    role: joi_1.default.string().required(),
    password: joi_1.default.string().min(8).max(30).required()
});
exports.default = schema;
