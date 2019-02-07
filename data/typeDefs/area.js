const { gql } = require('apollo-server-express');

const area = gql`
    type Area {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allAreas: [Area]
        fetchArea(id: Int!): Area
    }

    extend type Mutation {
        addArea (
            name: String!,
            description: String,
        ) : Area
        updateArea (
            id: Int!
            name: String!,
            description: String
        ) : Area
        # TODO: allow deletion of Areas Affected?
    }
`;
module.exports = area;