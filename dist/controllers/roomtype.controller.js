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
const roomtype_service_1 = __importDefault(require("../services/roomtype.service"));
class RoomTypeController {
    // Create roomtype
    createRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            // Check if room type exists
            try {
                const existingRoomType = yield roomtype_service_1.default.fetchOne({ name: name });
                if (existingRoomType) {
                    // Return a forbidden message response status (403)
                    return res.status(403).send({
                        success: false,
                        message: 'Roomtype already exists!'
                    });
                }
                else {
                    // Create new roomtype and return response status (201)
                    const newRoomType = yield roomtype_service_1.default.createRoomType({ name: name, description: description });
                    return res.status(201).send({
                        success: true,
                        message: 'Roomtype added successfully!',
                        data: newRoomType
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
    // Edit roomtype
    editRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomTypeName = req.params.name;
            const { name, description } = req.body;
            // Create a regex pattern incase a user searches for a roomtype in a case sensitive manner or with hyphen between each word 
            let regexName = roomTypeName.replace(/[- ]/g, "[- ]?");
            regexName = new RegExp(`^ ${regexName}$`);
            regexName = { $regex: regexName, $options: 'i' };
            // Check if roomtype exists
            try {
                const existingRoomType = yield roomtype_service_1.default.fetchOne({ name: regexName });
                // Check if roomtype exists
                if (!existingRoomType) {
                    return res.status(404).send({
                        success: false,
                        message: 'Cannot edit roomtype that does not exist'
                    });
                }
                else {
                    // Create update roomtype and return response status (201)
                    const updatedRoomType = yield roomtype_service_1.default.updateRoomType(regexName, { name: name, description: description });
                    return res.status(201).send({
                        success: true,
                        message: 'Roomtype updated successfully',
                        data: updatedRoomType
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
    // Delete a room type
    deleteRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomTypeName = req.params.name;
            const { name, description } = req.body;
            // Create a regex pattern incase a user searches for a roomtype in a case sensitive manner or with hyphen between each word 
            let regexName = roomTypeName.replace(/[- ]/g, "[- ]?");
            regexName = new RegExp(`^ ${regexName}$`);
            regexName = { $regex: regexName, $options: 'i' };
            // Check if roomtype exists
            try {
                const existingRoomType = yield roomtype_service_1.default.fetchOne(regexName);
                if (!existingRoomType) {
                    return res.status(403).send({
                        success: false,
                        message: 'Roomtype does not exist.'
                    });
                }
                else {
                    const deletedRoomType = yield roomtype_service_1.default.deleteRoomType(regexName);
                    // Return response status 
                    return res.status(200).send({
                        success: true,
                        message: 'Roomtype deleted successfully.',
                        data: deletedRoomType
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
    // Get a single roomtype
    fetchOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomTypeName = req.params.name;
            // Search for roomtype 
            let regexName = roomTypeName.replace(/[- ]/g, "[- ]?");
            regexName = new RegExp(`^${regexName}$`);
            regexName = { $regex: regexName, $options: 'i' };
            try {
                const existingRoomType = yield roomtype_service_1.default.fetchOne(regexName);
                if (!existingRoomType) {
                    // Return response status (404) does not exist
                    return res.status(404).send({
                        success: false,
                        message: 'Roomtype does not exist'
                    });
                }
                else {
                    return res.status(200).send({
                        success: true,
                        message: 'Roomtype fetched successfully.',
                        data: existingRoomType
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
    // Get all roomtypes
    fetchAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomtypes = yield roomtype_service_1.default.fetch({});
                if (!roomtypes) {
                    // Return response status message
                    return res.status(404).send({
                        success: false,
                        message: 'No data found!'
                    });
                }
                else {
                    return res.status(200).send({
                        success: true,
                        message: 'Roomtypes fetched successfully',
                        data: roomtypes
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
}
exports.default = new RoomTypeController();
