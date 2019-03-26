const { gql } = require('apollo-server-express');

const submission = gql`
    type Submission {
        id: Int!
        user: User!
        description: String! # description of the problem seen
        areas: [Area!]! # areas affected by the problem
        wastes: [Waste!]!
        improvements: [Improvement!]!
        improvementExplanation: String # explanation of the issue
        proposedSolution: String # proposed solution of the issue
        resources: [Resource!]!
        resourceExplanation: String # explanation of why the resources are needed
        solutionMeasurement: String # how the solution will be measured
        improvementAreaType: ImprovementAreaType
        progress: Progress
        approval: Approval
        lead: String
        supervisor: String
        supervisorapproval: SupervisorApproval
        reward: Reward
        comments: [Comment!]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allSubmissions: [Submission]
        fetchSubmission(id: Int!): Submission
        fetchSupervisorSubmissions: [Submission]
        fetchInProgressSubmissions(userId: Int!): [Submission]
        fetchActiveSubmissions(userId: Int!): [Submission]
        fetchCompletedSubmissions(userId: Int!): [Submission]
    }

    extend type Mutation {
        addSubmission (
            description: String!, 
            areas: [Int!]!,
            wastes: [Int!]!,
            improvements: [Int!]!,
            improvementExplanation: String,
            proposedSolution: String,
            resources: [Int!]!,
            resourceExplanation: String!,
            solutionMeasurement: String!,
            supervisor: String!
        ) : Submission
        updateSubmission (
            id: Int!,
            progress: Int,
            approval: Int,
            improvementAreaType: Int,
            lead: String,
            supervisorapproval: Int,
            reward: Int
        ) : Submission
        updateSubmissionSupervisorApproval (
            id: Int!,
            progress: Int!,
            supervisorapproval: Int,
            reward: Int
        ) : Submission
        updateSubmissionCommitteeApproval (
            id: Int!,
            progress: Int,
            approval: Int,
            lead: String,
            reward: Int
        ) : Submission
        updateSubmissionLead (
            id: Int!,
            lead: String
        ) : Submission
    }
`;
module.exports = submission;