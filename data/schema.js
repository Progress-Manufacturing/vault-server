'use strict';
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

// Define our schema using the GraphQL schema language
const typeDefs = gql`
    scalar DateTime
    type User {
        id: Int!
        firstName: String!
        lastName: String
        admin: Boolean!
        supervisor: Boolean!
        lead: Boolean!
        email: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
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
        status: Boolean!
        reward: Reward!
        progress: Progress!
        approval: Approval!
        comments: [Comment!]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Area {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Waste {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Improvement {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Resource {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Reward {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Approval {
        id: Int!
        name: String!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Comment {
        id: Int!
        content: String!
        user: User!
        submission: Submission!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Progress {
        id: Int!
        name: String!
        step: Int!
        description: String!
        submissions: [Submission!]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    
    type Query {
        allUsers: [User]
        fetchUser(id: Int!): User

        allSubmissions: [Submission]
        fetchSubmission(id: Int!): Submission

        allAreas: [Area]
        fetchArea(id: Int!): Area

        allWastes: [Waste]
        fetchWaste(id: Int!): Waste

        allImprovements: [Improvement]
        fetchImprovement(id: Int!): Improvement

        allResources: [Resource]
        fetchResource(id: Int!): Resource

        allRewards: [Reward]
        fetchReward(id: Int!): Reward

        allComments: [Comment]
        fetchComment(id: Int!): Comment

        allApprovals: [Approval]
        fetchApproval(id: Int!): Approval

        allProgresses: [Progress]
        fetchProgress(id: Int!): Progress
    }
    
    type Mutation {
        createUser (
            firstName: String!,
            lastName: String,
            email: String!,
            admin: Boolean,
            supervisor: Boolean,
            lead: Boolean
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            admin: Boolean,
            supervisor: Boolean,
            lead: Boolean
        ): User
        
        addSubmission (
            description: String!, 
            improvementExplanation: String!,
            proposedSolution: String!,
            resourceExplanation: String!,
            solutionMeasurement: String!,
            areas: [Int!]!,
            status: Boolean
        ) : Submission
        updateSubmission (
            id: Int!,
            lead: Int!,
            supervisor: Int!
            reward: Int!
        ) : Submission

        addComment (
            content: String!,
            user: Int!,
            status: Boolean
        ) : Comment
        # TODO: All user to update comment?
        
        addApproval (
            name: String!,
            description: String
        ) : Approval
        updateApproval (
            id: Int!,
            name: String!,
            description: String
        ) : Approval

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

        addArea (
            name: String!,
            description: String,
        ) : Area
        updateArea (
            id: Int!
            name: String!,
            description: String
        ) : Area
        # TODO: allow deletion of Areas Affected?

        addWaste (
            name: String!,
            description: String,
        ) : Waste
        updateWaste (
            id: Int!
            name: String!,
            description: String
        ) : Waste
        # TODO: allow deletion of Wastes?

        addImprovement (
            name: String!,
            description: String,
        ) : Improvement
        updateImprovement (
            id: Int!
            name: String!,
            description: String
        ) : Improvement
        # TODO: allow deletion of Improvements?

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

        addReward (
            name: String!,
            description: String
        ): Reward
        updateReward (
            id: Int!,
            name: String!
            description: String,
            status: Boolean
        ): Reward
    }
`;
module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.theme' : 'light'
        }
    }
})