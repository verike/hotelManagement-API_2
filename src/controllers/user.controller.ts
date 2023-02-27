import UserService from "../services/user.service";
import { Request, Response } from "express";

class UserController {
    
    // Add a user
    async createUser(req: Request, res: Response) {
        const { fullname, username, role, password } = req.body

        try {
            // Check if user exists
            const existingUser = await UserService.fetchOne({username: username})
            if(!existingUser){
                // Creates user and sends a success message
                const newUser = await UserService.createUser({ fullname: fullname, username: username, role: role, password: password })
                res.status(201).send({
                    success: true,
                    message: 'User created successfully!',
                    data: newUser
                })
            } else {
                // Send a forbidden message if user already exists
                res.status(403).send({
                    success: false,
                    message: 'User already exists!'
                })
            }   
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }  
    }

    // Updating a user
    async editUser(req: Request, res: Response) {

        let userName = req.params.username
        const { fullname, username, role, password } = req.body

        try {
            // Checks if user already exists
            const existingUser = await UserService.fetchOne({username: userName})

            // Sends a message if user does not exist
            if(!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'User does not exist'
                })
            } else {
                // Updates the user
                const updatedUser = await UserService.updateUser(userName, {username: username, fullname: fullname, role: role, password: password })

                // Send a success message with updated data
                return res.status(200).send({
                    success: true,
                    message: 'User updated successfully!',
                    data: updatedUser
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }     
    }

    // Deleting a user
    async deleteUser(req: Request, res: Response) {
        let username  = req.params.username

        try {
            const existingUser = await UserService.fetchOne({username: username})

            // Send a message if user does not exist
            if(!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'User does not exist'
                })
            } else {
                // Deletes the user
                const deletedUser = await UserService.deleteUser(username)
        
                // Sends a success message with deleted user data
                return res.status(200).send({
                    success: true,
                    message: 'User deleted successfully!',
                    data: deletedUser
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }  
    }

    // Get a user by username
    async fetchOne(req: Request, res: Response) {
        let username = req.params.username

        try {
            const existingUser = await UserService.fetchOne({username: username})

            // Sends a message if user does not exist
            if(!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'User does not exist'
                })
            } else {
                // Sends a success message and displays user
                return res.status(200).send({
                    success: true,
                    message: 'User fetched successfully!',
                    data: existingUser
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err
            })
        }  
    }

    // Getting all users
    async fetch(req: Request, res: Response) {

        try {
            const users = await UserService.fetch({})

            // Sends a message if no users exist
            if(!users) {
                return res.status(404).send({
                    success: false,
                    message: 'No data available'
                })
            } else {
                // Sends a success message and displays users
                return res.status(200).send({
                    success: true,
                    message: 'Users fetched successfully!',
                    data: users
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

export default new UserController()