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

    type LoggedInUserPayload {
        id: Int
    }

    extend type Query {
        allUsers: [User]
        fetchUser(
            id: Int!
        ): User
        me: User
        loggedInUser: LoggedInUserPayload
    }

    extend type Mutation {
        login ( 
            msalToken: String!
        ): AuthPayload
    }
`;

module.exports = user;