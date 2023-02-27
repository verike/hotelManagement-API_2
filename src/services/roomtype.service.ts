import RoomType from "../models/roomtype.model";

class RoomTypeService {

    // Create room type
    async createRoomType (roomtype: iRoomType) {
        return await RoomType.create(roomtype);
    }

    // Update room type
    async updateRoomType (name: String, roomtype: iRoomType) {
        return await RoomType.findOneAndUpdate(name, roomtype, {new: true});
    }

    // Delete room type
    async deleteRoomType (name: String) {
        return await RoomType.findOneAndDelete(name);
    }

    // Fetch one roomtype
    async fetchOne (filter: Partial<iRoomType> & {name: String}) {
        return await RoomType.findOne(filter);
    }

    // Fetch all roomtypes
    async fetch (filter: Partial<iRoomType>) {
        return await RoomType.find(filter)
    }

}

export default new RoomTypeService()