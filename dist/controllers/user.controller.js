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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    // Add a user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, username, role, password } = req.body;
            try {
                // Check if user exists
                const existingUser = yield user_service_1.default.fetchOne({ username: username });
                if (!existingUser) {
                    // Creates user and sends a success message
                    const newUser = yield user_service_1.default.createUser({ fullname: fullname, username: username, role: role, password: password });
                    res.status(201).send({
                        success: true,
                        message: 'User created successfully!',
                        data: newUser
                    });
                }
                else {
                    // Send a forbidden message if user already exists
                    res.status(403).send({
                        success: false,
                        message: 'User already exists!'
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
    // Updating a user
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userName = req.params.username;
            const { fullname, username, role, password } = req.body;
            try {
                // Checks if user already exists
                const existingUser = yield user_service_1.default.fetchOne({ username: userName });
                // Sends a message if user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'User does not exist'
                    });
                }
                else {
                    // Updates the user
                    const updatedUser = yield user_service_1.default.updateUser(userName, { username: username, fullname: fullname, role: role, password: password });
                    // Send a success message with updated data
                    return res.status(200).send({
                        success: true,
                        message: 'User updated successfully!',
                        data: updatedUser
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
    // Deleting a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            try {
                const existingUser = yield user_service_1.default.fetchOne({ username: username });
                // Send a message if user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'User does not exist'
                    });
                }
                else {
                    // Deletes the user
                    const deletedUser = yield user_service_1.default.deleteUser(username);
                    // Sends a success message with deleted user data
                    return res.status(200).send({
                        success: true,
                        message: 'User deleted successfully!',
                        data: deletedUser
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
    // Get a user by username
    fetchOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            try {
                const existingUser = yield user_service_1.default.fetchOne({ username: username });
                // Sends a message if user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'User does not exist'
                    });
                }
                else {
                    // Sends a success message and displays user
                    return res.status(200).send({
                        success: true,
                        message: 'User fetched successfully!',
                        data: existingUser
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
    // Getting all users
    fetch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.fetch({});
                // Sends a message if no users exist
                if (!users) {
                    return res.status(404).send({
                        success: false,
                        message: 'No data available'
                    });
                }
                else {
                    // Sends a success message and displays users
                    return res.status(200).send({
                        success: true,
                        message: 'Users fetched successfully!',
                        data: users
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
exports.default = new UserController();
