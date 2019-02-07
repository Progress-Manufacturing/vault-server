const { gql } = require('apollo-server-express');

const submission = gql`
    type Submission {
        id: Int!
        user: User!
        supervisor: User!
        lead: User!
        description: String! # description of the problem seen
        improvementExplanation: String! # explanation of the issue
        proposedSolution: String! # proposed solution of the issue
        resourceExplanation: String! # explanation of why the resources are needed
        solutionMeasurement: String! # how the solution will be measured
        areas: [Area!]! # areas affected by the problem
        wastes: [Waste!]!
        improvements: [Improvement!]!
        resources: [Resource!]!
        status: Boolean!
        reward: Reward!
        progress: Progress!
        approval: Approval!
        comments: [Comment!]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allSubmissions: [Submission]
        fetchSubmission(id: Int!): Submission
    }

    extend type Mutation {
        addSubmission (
            description: String!, 
            improvementExplanation: String!,
            proposedSolution: String!,
            resourceExplanation: String!,
            solutionMeasurement: String!,
            areas: [Int!]!,
            wastes: [Int!]!,
            improvements: [Int!]!,
            resources: [Int!]!,
            status: Boolean
        ) : Submission
        updateSubmission (
            id: Int!,
            lead: Int!,
            supervisor: Int!
            reward: Int!
        ) : Submission
    }
`;
module.exports = submission;