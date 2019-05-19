require('dotenv').config();
const { User } = require('../../models');
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
            const user = await User.findOne({ where: { oid: context.authScope.oid } });
            return { user: user };
        }
    },
    Mutation: {
        // Authenticate User
        async login(_, { msalToken }) {
            const login_user = msalToken ? jwt.decode(msalToken) : null;
            const email = login_user.preferred_username;
            const isProgress = email.split('@')[1];
            let user = await User.findOne({ where: { email } });

            if(!user && isProgress === 'progressmfg.com') {
                await User.create({ 
                    name: login_user.name, 
                    email: email, 
                    oid: login_user.oid 
                }).then(async () => {
                    user = await User.findOne({ where: { email } });
                });
            }
            
            return await { user: user.id } 
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