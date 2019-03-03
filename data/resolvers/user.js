const { User } = require('../../models');
require('dotenv').config();
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const user = {
    Query: {
        // Fetch all users
        async allUsers() {
            return await User.all();
        },
        // Get a user by Email
        async fetchUser(_, { email }) {
            return await User.find({ where: { email } });
        }
    },
    Mutation: {
        // Authenticate User
        async login(_, { msalToken }) {
            const login_user = msalToken ? jwtDecode(msalToken) : null;
            const email = login_user.preferred_username;
            const user = await User.find({ where: { email } });
            
            if (!user) {
                console.info(`No such user found, creating user with email: ${email}`);
                await User.create({
                    name: user.name,
                    email: email
                })                
                // throw new Error(`No such user found for email: ${email}`)
            } else {
                console.info(`User with email: ${email}, already exists.`);
            }

            return {
                token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
                user: user.id
            };
        }
    },
    User: {
        // Fetch all submissions created by a user
        async submissions(user) {
            return await user.getSubmissions();
        }
    },
    AuthPayload: {
        async user(id) {  
            const user = await User.findById(id.user);
            return user;
        }
    }
};

module.exports = user;