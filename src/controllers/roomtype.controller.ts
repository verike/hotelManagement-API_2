import { Request, Response } from 'express';
import RoomTypeService from '../services/roomtype.service';

class RoomTypeController {

    // Create roomtype
    async createRoomType (req: Request, res: Response) {
        
        const { name, description } = req.body;

        // Check if room type exists
        try {
            const existingRoomType = await RoomTypeService.fetchOne({name: name});
            if (existingRoomType) {
                // Return a forbidden message response status (403)
                return res.status(403).send({
                    success: false,
                    message: 'Roomtype already exists!'
                })
            } else {
                // Create new roomtype and return response status (201)
                const newRoomType = await RoomTypeService.createRoomType({name: name, description: description});
                return res.status(201).send({
                    success: true,
                    message: 'Roomtype added successfully!',
                    data: newRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Edit roomtype
    async editRoomType (req: Request, res: Response) {
        
        const roomTypeName = req.params.name
        const { name, description } = req.body;

        // Create a regex pattern incase a user searches for a roomtype in a case sensitive manner or with hyphen between each word 
        let regexName: any = roomTypeName.replace(/[- ]/g, "[- ]?");
        regexName = new RegExp(`^ ${regexName}$`)
        regexName = {$regex: regexName, $options: 'i'}

        // Check if roomtype exists
        try {
            const existingRoomType = await RoomTypeService.fetchOne({name: regexName})

            // Check if roomtype exists
            if (!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'Cannot edit roomtype that does not exist'
                })
            } else {
                // Create update roomtype and return response status (201)
                const updatedRoomType = await RoomTypeService.updateRoomType(regexName, {name: name, description: description})

                return res.status(201).send({
                    success: true,
                    message: 'Roomtype updated successfully',
                    data: updatedRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Delete a room type
    async deleteRoomType (req: Request, res: Response) {
                
        const roomTypeName = req.params.name
        const { name, description } = req.body;

        // Create a regex pattern incase a user searches for a roomtype in a case sensitive manner or with hyphen between each word 
        let regexName: any = roomTypeName.replace(/[- ]/g, "[- ]?");
        regexName = new RegExp(`^ ${regexName}$`)
        regexName = {$regex: regexName, $options: 'i'}

        // Check if roomtype exists
        try {
            const existingRoomType = await RoomTypeService.fetchOne(regexName);

            if (!existingRoomType) {
                return res.status(403).send({
                    success: false,
                    message: 'Roomtype does not exist.'
                })
            } else {
                const deletedRoomType = await RoomTypeService.deleteRoomType(regexName);

                // Return response status 
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype deleted successfully.',
                    data: deletedRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Get a single roomtype
    async fetchOne (req: Request, res: Response) {
        const roomTypeName = req.params.name;

        // Search for roomtype 

        let regexName: any = roomTypeName.replace(/[- ]/g, "[- ]?");
        regexName = new RegExp(`^${regexName}$`);
        regexName = {$regex: regexName, $options: 'i'}

        try {
            const existingRoomType = await RoomTypeService.fetchOne(regexName)

            if (!existingRoomType) {
                // Return response status (404) does not exist

                return res.status(404).send({
                    success: false,
                    message: 'Roomtype does not exist'
                })
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype fetched successfully.',
                    data: existingRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

    // Get all roomtypes
    async fetchAll (req: Request, res: Response) {
        try {
            const roomtypes = await RoomTypeService.fetch({})

            if (!roomtypes) {
                // Return response status message
                return res.status(404).send({
                    success: false,
                    message: 'No data found!'
                })
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Roomtypes fetched successfully',
                    data: roomtypes
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }
    }

}

export default new RoomTypeController ();