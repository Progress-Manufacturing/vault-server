'use strict';
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // get the user token from the headers
        // const token = req.user.token || '';
        // const user = req.user._json.preferred_username;
        // const users = await store.users.findOrCreate({ where: { email } });
        
        // add the user to the context
        // return { user };
    },
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.theme' : 'dark',
            'request.credentials': 'include'
        }
    }
})
