import User from "../models/user.model";

class UserService {

    // Create user
    async createUser (user: iUser) {
        return await User.create(user);
    }

    // Update user
    async updateUser (username: String, update: iUser) {
        return await User.findOneAndUpdate({username: username}, update, {new: true});
    }

    // Delete user
    async deleteUser (username: String) {
        return await User.findOneAndDelete({username: username})
    }

    // Fetch one user
    async fetchOne (filter: Partial<iUser> & {username: String}) {
        return await User.findOne(filter);
    }

    // Fetch all users
    async fetch (filter: Partial<iUser>) {
        return await User.find(filter);
    }

}

export default new UserService()