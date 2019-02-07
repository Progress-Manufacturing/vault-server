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
        async createUser(_, { firstName, lastName, email, admin, supervisor, lead }) {
            return await User.create({
                firstName,
                lastName,
                email,
                admin,
                supervisor,
                lead
            });
        },
        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, admin, supervisor, lead  }) {
            // fetch the user by it ID
            const user = await User.findById(id);
            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                admin,
                supervisor,
                lead
            });
            return user;
        }
    },
    User: {
        // Fetch all submissions created by a user
        async submissions(user) {
            return await user.getSubmission();
        }
    }
};

module.exports = user;