const { gql } = require('apollo-server-express');

const supervisorapproval = gql`
    type SupervisorApproval {
        id: Int!
        name: String!
        description: String!
        submissions: [Submission!]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    
    extend type Query {
        allSupervisorApprovals: [SupervisorApproval]
        fetchSupervisorApproval(id: Int!): SupervisorApproval
    }

    extend type Mutation {
        addSupervisorApproval (
            name: String!,
            description: String
        ) : SupervisorApproval
        updateSupervisorApproval (
            id: Int!,
            name: String!,
            description: String
        ) : SupervisorApproval
    }
`;
module.exports = supervisorapproval;