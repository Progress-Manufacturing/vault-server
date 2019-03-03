const { gql } = require('apollo-server-express');
const user = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    extend type Query {
        allUsers: [User]
        fetchUser(
            email: String!
        ): User
    }

    extend type Mutation {
        login ( 
            msalToken: String!
        ): AuthPayload
    }
`;

module.exports = user;