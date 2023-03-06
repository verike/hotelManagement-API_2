// import { ObjectId } from "mongoose";
// import iRoom from "../interfaces/room.interface";
import Room from "../models/room.model";

class RoomService {

    // Create room 
    async createRoom (room: iRoom) {
        return await Room.create(room);
    }

    // Update room
    async updateRoom (name: String, room: iRoom) {
        return await Room.findOneAndUpdate({name: name}, room, {new: true});
    }

    // Delete room
    async deleteRoom (name: String) {
        return await Room.findOneAndDelete({name: name});
    }

    // Fetch one room
    async fetchOne (filter: Partial<iRoom> & {name: String}) {
        return await Room.findOne(filter).populate('roomtype')
    }

    // Fetch all rooms
    async fetch (filter: Partial<iRoom>) {
        return await Room.find(filter).populate('roomtype')
    }

}

export default new RoomService()