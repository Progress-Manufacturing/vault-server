const { gql } = require('apollo-server-express');

const resource = gql`
    type Resource {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allResources: [Resource]
        fetchResource(id: Int!): Resource
    }

    extend type Mutation {
        addResource (
            name: String!,
            description: String,
        ) : Resource
        updateResource (
            id: Int!
            name: String!,
            description: String
        ) : Resource
        # TODO: allow deletion of Resources?
    }
`;
module.exports = resource;