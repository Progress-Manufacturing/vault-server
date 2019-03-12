'use strict';
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

function authScope(req) {
    const Authorization = req.get("Authorization")
    
    if(Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const { idToken } = jwt.decode(token)
        
        return { userId, idToken }
    }
}

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
        authScope: await authScope(req)
    }),
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.theme' : 'dark'
        }
    }
})
