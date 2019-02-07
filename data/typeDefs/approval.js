const { gql } = require('apollo-server-express');

const approval = gql`
    type Approval {
        id: Int!
        name: String!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allApprovals: [Approval]
        fetchApproval(id: Int!): Approval
    }

    extend type Mutation {
        addApproval (
            name: String!,
            description: String
        ) : Approval
        updateApproval (
            id: Int!,
            name: String!,
            description: String
        ) : Approval
    }
`;
module.exports = approval;