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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const room_model_1 = __importDefault(require("./models/room.model"));
mongoose_1.default.set('strictQuery', true);
// Getting access to the .env file for the database link
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
// Creating a server
const app = (0, express_1.default)();
// Allows us to send and receive json files 
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Access to all files
app.use('/api/v1', index_route_1.default);
app.use('/api/v1/login', login_route_1.default, (res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('You are logged in');
    const rooms = yield room_model_1.default.find().populate('roomtype');
    res.status(200).send({
        message: rooms
    });
}));
// Connects to the database
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err, ':', err.message));
const port = process.env.PORT || 3000;
// Server listening for requests
app.listen(port, () => console.log(`Server connected on port ${port}`));
