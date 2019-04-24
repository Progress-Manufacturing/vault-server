const { gql } = require('apollo-server-express');
const user = gql`
    type User {
        id: Int!
        admin: Int!
        name: String!
        email: String!
        secondaryEmail: String
        oid: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type LoggedInUserPayload {
        token: String!
        user: User!
    }

    extend type Query {
        allUsers: [User]
        fetchUser(
            id: Int!
        ): User
        fetchAdminUsers: [User]
        me: LoggedInUserPayload
    }

    extend type Mutation {
        login ( 
            msalToken: String!
        ): AuthPayload
    }
`;

module.exports = user;