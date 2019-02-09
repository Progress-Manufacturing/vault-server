const { gql } = require('apollo-server-express');
const user = gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        email: String!
        supervisor: Int!
        isAdmin: Boolean!
        isSupervisor: Boolean
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
            firstName: String!,
            lastName: String,
            email: String!,
            supervisor: Int!,
            isAdmin: Boolean,
            isSupervisor: Boolean
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            supervisor: Int,
            isAdmin: Boolean,
            isSupervisor: Boolean            
        ): User
    }
`;

module.exports = user;