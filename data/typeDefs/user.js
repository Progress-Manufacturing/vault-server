const { gql } = require('apollo-server-express');
const user = gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        admin: Boolean!
        supervisor: Boolean!
        lead: Boolean!
        email: String!
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
            admin: Boolean,
            supervisor: Boolean,
            lead: Boolean
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            admin: Boolean,
            supervisor: Boolean,
            lead: Boolean
        ): User
    }
`;

module.exports = user;