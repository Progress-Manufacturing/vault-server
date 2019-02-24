const { gql } = require('apollo-server-express');

const message = gql`
    type Message {
        id: Int!
        name: String!
        message: String! # message to display
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allMessages: [Message]
        fetchMessage(id: Int!): Message
    }

    extend type Mutation {
        addMessage (
            name: String!, 
            message: String!
        ) : Message
        updateMessage (
            id: Int!,
            name: String!,
            message: String!            
        ) : Message
    }
`;
module.exports = message;