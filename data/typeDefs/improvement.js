const { gql } = require('apollo-server-express');

const improvement = gql`
    type Improvement {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allImprovements: [Improvement]
        fetchImprovement(id: Int!): Improvement
    }

    extend type Mutation {
        addImprovement (
            name: String!,
            description: String,
        ) : Improvement
        updateImprovement (
            id: Int!
            name: String!,
            description: String
        ) : Improvement
        # TODO: allow deletion of Improvements?
    }
`;
module.exports = improvement;