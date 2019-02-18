'use strict';
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.user.token || '';
        // try to retrieve a user with the token
        // const user = this.getUser(token)
        // console.log(user);
        // add the user to the context
        return { token };
    },
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.theme' : 'dark',
            'request.credentials': 'include'
        }
    }
})
