const { gql } = require('apollo-server-express');

const waste = gql`
    type Waste {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allWastes: [Waste]
        fetchWaste(id: Int!): Waste
    }

    extend type Mutation {
        addWaste (
            name: String!,
            description: String,
        ) : Waste
        updateWaste (
            id: Int!
            name: String!,
            description: String
        ) : Waste
        # TODO: allow deletion of Wastes?
    }
`;
module.exports = waste;