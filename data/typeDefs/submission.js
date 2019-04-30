const { gql } = require('apollo-server-express');

const submission = gql`
    type Submission {
        id: Int!
        user: User!
        description: String! # description of the problem seen
        areas: [Area!]! # areas affected by the problem
        wastes: [Waste!]!
        improvements: [Improvement!]!        
        proposedSolution: String # proposed solution of the issue
        resources: [Resource!]!
        resourceExplanation: String # explanation of why the resources are needed
        solutionMeasurement: String # how the solution will be measured
        improvementAreaType: ImprovementAreaType
        department: String!
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
        allSubmissions: [Submission] # All Submission        
        fetchSubmission(id: Int!): Submission # Submission by ID

        # Submission by Department
        fetchDepartmentSubmissions(dept: String!, startTime: DateTime!, endTime: DateTime!): [Submission]

        # All Submissions
        fetchNewAllSubmissions: [Submission]
        fetchInProgressAllSubmissions: [Submission]
        fetchActiveAllSubmissions: [Submission]
        fetchCompletedAllSubmissions: [Submission]

        # Supervisor Submissions
        fetchSupervisorSubmissions: [Submission]
        fetchNewSupervisorSubmissions: [Submission]
        fetchInProgressSupervisorSubmissions: [Submission]
        fetchActiveSupervisorSubmissions: [Submission]
        fetchCompletedSupervisorSubmissions: [Submission]

        # Team Lead Submissions
        fetchLeadSubmissions: [Submission]
        fetchNewLeadSubmissions: [Submission]
        fetchActiveLeadSubmissions: [Submission]
        fetchCompletedLeadSubmissions: [Submission]
        
        # User Submissions
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
            proposedSolution: String,
            resources: [Int!]!,
            resourceExplanation: String!,
            solutionMeasurement: String!,
            supervisor: String!
            department: String!
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
        addSubmissionSupervisorApproval (
            submissionId: Int!,
            progress: Int!,
            supervisorapproval: Int!,
            content: String!,
            commentType: Int!,
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