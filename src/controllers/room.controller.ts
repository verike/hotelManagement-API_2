import { Request, Response } from 'express';
import RoomService from '../services/room.service';
import RoomTypeService from '../services/roomtype.service';

class RoomController {

    // Create a room 
    async createRoom (req: Request, res: Response) {

        const { name, roomtype, price, description} = req.body

        // Check if room exists
        try {
            const existingRoom = await RoomService.fetchOne({name: name})

            if (existingRoom) {

                // Return forbidden response status
                res.status(403).send({
                    success: false,
                    message: 'Room already exists!'
                })
            } 
            
            // Search for roomtype with provided name
            const searchRoomType = await RoomTypeService.fetchOne({name: roomtype});

            if (searchRoomType){

                const newRoom = await RoomService.createRoom({name: name, roomtype: searchRoomType, price: price});
                return res.status(201).send({
                    success: true,
                    message: 'Room created successfully.',
                    data: newRoom
                })
            } else {

                // Create roomtype
                let roomtypedata: iRoom & any = {}
                roomtypedata.name = roomtype
                roomtypedata.description = description

                const newroomtype = await RoomTypeService.createRoomType(roomtypedata)

                // Create room
                const newRoom = await RoomService.createRoom({name: name, roomtype: newroomtype, price: price})

                return res.status(201).send({
                    success: true,
                    message: 'Room created successfully.',
                    data: newRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Update a room
    async updateRoom (req: Request, res: Response) {
        const roomname = req.params.name
        const {name, roomtype, price} = req.body

        try {
            // check if room exists
            const existingRoom =  await RoomService.fetchOne({name: roomname})
            if (!existingRoom) {
                // Return forbidden response
                return res.status(403).send({
                    success: false,
                    message: 'Room does not exist'
                })
            }
                
            // check if the update name matches any room in database
            else if (existingRoom === null) {
                
                const updatedRoom = await RoomService.updateRoom(roomname, {name: name, roomtype: roomtype, price: price});

                // Send success response message
                res.status(200).send({
                    success: true,
                    message: 'Room updated successfully',
                    data: updatedRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Delete a room
    async deleteRoom (req: Request, res: Response) {
        const roomname = req.params.name
        const {name, roomtype, price} = req.body

        try {
            // check if room exists
            const existingRoom =  await RoomService.fetchOne({name: roomname})
            if (!existingRoom) {
                // Return forbidden response
                return res.status(403).send({
                    success: false,
                    message: 'Room does not exist'
                })
            }
                
            // Delete room match in database
            else {
                
                const deletedRoom = await RoomService.deleteRoom(roomname);

                // Send success response message
                res.status(200).send({
                    success: true,
                    message: 'Room deleted successfully',
                    data: deletedRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Fetch a single room
    async fetchOne (req: Request, res: Response) {
        const roomname = req.params.name

        try {
            const foundRoom = await RoomService.fetchOne({name: roomname})

            if(!foundRoom){
                return res.status(400).send({
                    success: false,
                    message: 'Room does not exist!'
                })
            } else {
                // Send a success message with the room
                res.status(200).send({
                    success: true,
                    message: 'Room fetched successfully!!',
                    data: foundRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }

    }

    // Fetch all the rooms
    async fetch (req: Request, res: Response) {
        try {
            // To display all rooms without filter
            let foundRooms = await RoomService.fetch({})

            // Sends a success message and returns the found rooms
            res.status(200).send({
                success: true,
                message: 'Rooms fetched successfully',
                data: foundRooms
            })

        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }  
    }

}

export default new RoomController()