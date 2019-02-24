const { gql } = require('apollo-server-express');

const improvementareatype = gql`
    type ImprovementAreaType {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allImprovementAreaTypes: [ImprovementAreaType]
        fetchImprovementAreaType(id: Int!): ImprovementAreaType
    }

    extend type Mutation {
        addImprovementAreaType (
            name: String!,
            description: String,
        ) : ImprovementAreaType
        updateImprovementAreaType (
            id: Int!
            name: String!,
            description: String
        ) : ImprovementAreaType
        # TODO: allow deletion of ImprovementAreaTypes?
    }
`;
module.exports = improvementareatype;