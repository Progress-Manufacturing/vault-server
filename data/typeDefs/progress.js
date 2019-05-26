const { gql } = require('apollo-server-express');

const progress = gql`
    type Progress {
        id: Int!
        name: String!
        step: Int!
        description: String
        submissions: [Submission!]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    
    extend type Query {
        allProgresses: [Progress]
        fetchProgress(id: Int!): Progress
    }

    extend type Mutation {
        addProgress (
            name: String!,
            step: Int!,
            description: String
        ) : Progress
        updateProgress (
            id: Int!,
            name: String!,
            step: Int!,
            description: String
        ) : Progress
    }
`;
module.exports = progress;