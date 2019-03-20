const { gql } = require('apollo-server-express');

const supapproval = gql`
    type SupApproval {
        id: Int!
        name: String!
        description: String!
        submissions: [Submission!]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allSupApprovals: [SupApproval]
        fetchSupApproval(id: Int!): SupApproval
    }

    extend type Mutation {
        addSupApproval (
            name: String!,
            description: String
        ) : SupApproval
        updateSupApproval (
            id: Int!,
            name: String!,
            description: String
        ) : SupApproval
    }
`;
module.exports = supapproval;