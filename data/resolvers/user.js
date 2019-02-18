const { User } = require('../../models');
require('dotenv').config();

const user = {
    Query: {
        // Fetch all users
        async allUsers() {
            return await User.all();
        },
        // Get a user by it ID
        async fetchUser(_, { id }) {
            return await User.findById(id);
        }
    },
    Mutation: {
        // Create new user
        async createUser(_, { id, name, email, token }) {
            return await User.create({
                name,               
                email,
                token
            });
        },
        // // Update a particular user
        // async updateUser(_, { id, isAdmin }) {
        //     // fetch the user by it ID
        //     const user = await User.findById(id);
        //     // Update the user
        //     await user.update({
        //         isAdmin
        //     });
        //     return user;
        // }
    },
    User: {
        // Fetch all submissions created by a user
        async submissions(user) {
            return await user.getSubmissions();
        }
    }
};

module.exports = user;