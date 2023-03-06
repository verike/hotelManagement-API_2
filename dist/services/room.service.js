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
// import { ObjectId } from "mongoose";
// import iRoom from "../interfaces/room.interface";
const room_model_1 = __importDefault(require("../models/room.model"));
class RoomService {
    // Create room 
    createRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room_model_1.default.create(room);
        });
    }
    // Update room
    updateRoom(name, room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room_model_1.default.findOneAndUpdate({ name: name }, room, { new: true });
        });
    }
    // Delete room
    deleteRoom(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room_model_1.default.findOneAndDelete({ name: name });
        });
    }
    // Fetch one room
    fetchOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room_model_1.default.findOne(filter).populate('roomtype');
        });
    }
    // Fetch all rooms
    fetch(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room_model_1.default.find(filter).populate('roomtype');
        });
    }
}
exports.default = new RoomService();
