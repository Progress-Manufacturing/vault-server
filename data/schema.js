'use strict';
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

function authScope(req) {
    const Authorization = req.get('Authorization');
    
    if(Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { oid } = jwt.decode(token);
        return { oid }
    }
}

const GRAPHQL_PLAYGROUND_CONFIG = {
    settings: {
      'editor.cursorShape': 'line',
      'editor.fontSize': 14,
      'editor.reuseHeaders': true,
      'editor.theme': 'dark',
      'editor.endpoint': '/graphql'
    }
}

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
        authScope: await authScope(req)
    }),
    playground: process.env.NODE_ENV === 'production' ? false : GRAPHQL_PLAYGROUND_CONFIG
})
