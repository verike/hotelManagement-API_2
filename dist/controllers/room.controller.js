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
const room_service_1 = __importDefault(require("../services/room.service"));
const roomtype_service_1 = __importDefault(require("../services/roomtype.service"));
class RoomController {
    // Create a room 
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, roomtype, price, description } = req.body;
            // Check if room exists
            try {
                const existingRoom = yield room_service_1.default.fetchOne({ name: name });
                if (existingRoom) {
                    // Return forbidden response status
                    res.status(403).send({
                        success: false,
                        message: 'Room already exists!'
                    });
                }
                // Search for roomtype with provided name
                const searchRoomType = yield roomtype_service_1.default.fetchOne({ name: roomtype });
                if (searchRoomType) {
                    const newRoom = yield room_service_1.default.createRoom({ name: name, roomtype: searchRoomType, price: price });
                    return res.status(201).send({
                        success: true,
                        message: 'Room created successfully.',
                        data: newRoom
                    });
                }
                else {
                    // Create roomtype
                    let roomtypedata = {};
                    roomtypedata.name = roomtype;
                    roomtypedata.description = description;
                    const newroomtype = yield roomtype_service_1.default.createRoomType(roomtypedata);
                    // Create room
                    const newRoom = yield room_service_1.default.createRoom({ name: name, roomtype: newroomtype, price: price });
                    return res.status(201).send({
                        success: true,
                        message: 'Room created successfully.',
                        data: newRoom
                    });
                }
            }
            catch (err) {
                res.send({
                    error: err,
                    message: err
                });
            }
        });
    }
    // Update a room
    updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomname = req.params.name;
            const { name, roomtype, price } = req.body;
            try {
                // check if room exists
                const existingRoom = yield room_service_1.default.fetchOne({ name: roomname });
                if (!existingRoom) {
                    // Return forbidden response
                    return res.status(403).send({
                        success: false,
                        message: 'Room does not exist'
                    });
                }
                // check if the update name matches any room in database
                else if (existingRoom === null) {
                    const updatedRoom = yield room_service_1.default.updateRoom(roomname, { name: name, roomtype: roomtype, price: price });
                    // Send success response message
                    res.status(200).send({
                        success: true,
                        message: 'Room updated successfully',
                        data: updatedRoom
                    });
                }
            }
            catch (err) {
                res.send({
                    error: err,
                    message: err
                });
            }
        });
    }
    // Delete a room
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomname = req.params.name;
            const { name, roomtype, price } = req.body;
            try {
                // check if room exists
                const existingRoom = yield room_service_1.default.fetchOne({ name: roomname });
                if (!existingRoom) {
                    // Return forbidden response
                    return res.status(403).send({
                        success: false,
                        message: 'Room does not exist'
                    });
                }
                // Delete room match in database
                else {
                    const deletedRoom = yield room_service_1.default.deleteRoom(roomname);
                    // Send success response message
                    res.status(200).send({
                        success: true,
                        message: 'Room deleted successfully',
                        data: deletedRoom
                    });
                }
            }
            catch (err) {
                res.send({
                    error: err,
                    message: err
                });
            }
        });
    }
    // Fetch a single room
    fetchOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomname = req.params.name;
            try {
                const foundRoom = yield room_service_1.default.fetchOne({ name: roomname });
                if (!foundRoom) {
                    return res.status(400).send({
                        success: false,
                        message: 'Room does not exist!'
                    });
                }
                else {
                    // Send a success message with the room
                    res.status(200).send({
                        success: true,
                        message: 'Room fetched successfully!!',
                        data: foundRoom
                    });
                }
            }
            catch (err) {
                res.send({
                    error: err,
                    message: err
                });
            }
        });
    }
    // Fetch all the rooms
    fetch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // To display all rooms without filter
                let foundRooms = yield room_service_1.default.fetch({});
                // Sends a success message and returns the found rooms
                res.status(200).send({
                    success: true,
                    message: 'Rooms fetched successfully',
                    data: foundRooms
                });
            }
            catch (err) {
                res.send({
                    error: err,
                    message: err
                });
            }
        });
    }
}
exports.default = new RoomController();
