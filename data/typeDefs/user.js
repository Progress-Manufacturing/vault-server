const { gql } = require('apollo-server-express');
const user = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        token: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allUsers: [User]
        fetchUser(id: Int!): User
    }

    extend type Mutation {
        createUser (
            name: String!, 
            email: String!
        ): User
    }
`;

module.exports = user;