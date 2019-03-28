const { gql } = require('apollo-server-express');

const leadinfo = gql`
    type LeadInfo {
        id: Int!
        user: User!
        submission: Submission!
        potentialStartDate: String
        potentialEndDate: String
        actualStartDate: String
        actualEndDate: String
        resources: [Resource]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allLeadInfo: [LeadInfo]
        fetchLeadInfo(id: Int!): LeadInfo
        fetchSubmissionLeadInfo(submission: Int!): LeadInfo
    }

    extend type Mutation {
        addLeadInfo (
            submission: Int!
            potentialStartDate: String
            potentialEndDate: String
            actualStartDate: String
            actualEndDate: String
            resources: [Int]
        ) : LeadInfo
        updateLeadInfo (
            id: Int!
            actualStartDate: DateTime
            actualEndDate: DateTime
        ) : LeadInfo
    }
`;
module.exports = leadinfo;