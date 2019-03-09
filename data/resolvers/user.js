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
        // Get a user by ID
        async fetchUser(_, { id }) {
            return await User.findByPk(id);
        },
        async me(parent, args, context, info) {
            return await { 
                token: context.authScope.idToken,
                user: User.findByPk(context.authScope.userId),
            }
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
                    name: login_user.name,
                    email: email
                }).then(() => {
                    return user;
                }).catch((err) => {
                    return console.info(err);
                })
            } else {
                console.info(`User with email: ${email}, already exists.`);
            }

            return await {
                token: jwt.sign({ userId: user.id, idToken: msalToken }, process.env.JWT_SECRET),
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
            const user = User.findById(id.user);
            return await user;
        }
    }
};

module.exports = user;