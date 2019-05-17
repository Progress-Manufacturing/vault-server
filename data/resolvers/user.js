const { User } = require('../../models');
require('dotenv').config();
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
        async fetchAdminUsers() {
            return await User.findAll({ where: { admin: 1 } });
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
            const login_user = msalToken ? jwt.decode(msalToken) : null;
            const email = login_user.preferred_username;
            let user = await User.findOne({ where: { email } });
            
            if(!user) {
                await User.create({ 
                    name: login_user.name, 
                    email: email, 
                    oid: login_user.oid 
                }).then(async () => {
                    user = await User.find({ where: { email } })
                })
            }
            
            return await {
                token: jwt.sign({ userId: user.id, idToken: msalToken }, process.env.JWT_SECRET),
                user: user.id
            }
            
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
            const user = User.findByPk(id.user);
            return await user;
        }
    }
};

module.exports = user;