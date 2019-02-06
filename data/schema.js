'use strict';
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

// Define our schema using the GraphQL schema language
const typeDefs = `
    scalar DateTime
    type User {
        id: Int!
        firstName: String!
        lastName: String
        admin: Boolean!
        supervisor: Boolean!
        lead: Boolean!
        email: String!
        submissions: [Submissions]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Submission {
        id: Int!
        user: User!
        supervisor: User!
        lead: User!
        description: String! # description of the problem seen
        areasAffected: [AreaAffected!]! # areas effected by the problem
        wastesSeen: [Waste!]! # wastes seen in the problem
        processImproved: [Process!]! # what process will be improved by suggestion
        improvementExplanation: String! # how the process will be improved
        proposedSolution: String! # solution to problem seen
        resourcesNeeded: [Resource!]! 
        resourcesExplanation: String! # why the requested resources are needed
        solutionMeasurement: String! # how the solution will be measured
        rewardId: Reward! # what type of reward was given
        status: Boolean!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type AreaAffected {
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
    type Process {
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
    type Comment {
        id: Int!
        userId: User!
        content: String!
        submission: Submission!
        status: Boolean!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    # TODO: get supervisors, leads and admin
    # TODO: get all users under supervisor
    # TODO: get all users under lead
    type Query {
        allUsers: [User]
        fetchUser(id: Int!): User
        allSubmissions: [Submission]
        fetchSubmission(id: Int!): Submission
        allAreasAffected: [AreaAffected]
        fetchAreaAffected(id: Int!): AreaAffected
        allWastes: [Waste]
        fetchWaste(id: Int!): Waste
        allProcesses: [Process]
        fetchProcess(id: Int!): Process
        allResources: [Resource]
        fetchResource(id: Int!): Resource
        allRewards: [Reward]
        fetchReward(id: Int!): Reward
        allComments: [Comment]
        fetchComment(id: Int!): Comment
    }
    type Mutation {
        createUser (
            firstName: String!,
            lastName: String,
            email: String!
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
        ): User
        addSubmission (
            description: String!, 
            areasAffected: [Int!]!,
            wastesSeen: [Int!]!,
            processImproved: [Int!]!,
            improvementExplanation: String!,
            proposedSolution: String!,
            resourcesNeeded: [Int!]!,
            resourcesExplanation: String!,
            solutionMeasurement: String!,
            status: Boolean
        ) : Submission
        updateSubmission (
            id: Int!,
            supervisor: Int!,
            lead: Int!,
            status: Boolean,
            rewardId: Int!,
        ) : Submission
        
        addComment (
            content: String!
            submission: Int!
            status: Boolean
        ) : Comment
        #TODO: allow for update or deletion of comments

        addAreaAffected (
            name: String!,
            description: String,
        ) : AreaAffected
        updateAreaAffected (
            id: Int!,
            name: String!,
            description: String
        ) : AreasAffected
        # TODO: allow deletion of Areas Affected

        addWaste (
            name: String!,
            description: String,
        ) : Waste
        updateWaste (
            id: Int!,
            name: String!,
            description: String
        ) : Waste
        # TODO: allow deletion of Waste

        addProcess (
            name: String!,
            description: String,
        ) : Process
        updateProcess (
            id: Int!,
            name: String!,
            description: String
        ) : Process
        # TODO: allow deletion of Process

        addResource (
            name: String!,
            description: String,
        ) : Resource
        updateResource (
            id: Int!,
            name: String!,
            description: String
        ) : Resource
        # TODO: allow deletion of Resource

        addReward (
            name: String!,
            description: String,
        ) : Reward
        updateReward (
            id: Int!,
            name: String!,
            description: String
        ) : Reward
        # TODO: allow deletion of Reward
    }
`;
module.exports = makeExecutableSchema({ typeDefs, resolvers });