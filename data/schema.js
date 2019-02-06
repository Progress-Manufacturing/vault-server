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
        areasAffected: [AreaAffected!]! # areas effected by the problem
        waste: [Waste!]! # wastes seen in the problem
        process: [Process!]! # what process will be improved by suggestion
        explanation: String! # how the process will be improved
        solution: String! # solution to problem seen
        resource: [Resource!]! 
        resourcesExplanation: String! # why the requested resources are needed
        measurement: String! # how the solution will be measured
        reward: Reward! # what type of reward was given
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
    type Progress {
        id: Int!
        name: String!
        description: String!
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

        allWaste: [Waste]
        fetchWaste(id: Int!): Waste

        allProcess: [Process]
        fetchProcess(id: Int!): Process

        allResource: [Resource]
        fetchResource(id: Int!): Resource

        allReward: [Reward]
        fetchReward(id: Int!): Reward

        allComment: [Comment]
        fetchComment(id: Int!): Comment
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
            areasAffected: [Int!]!,
            waste: [Int!]!,
            process: [Int!]!,
            explanation: String!,
            solution: String!,
            resource: [Int!]!,
            resourcesExplanation: String!,
            measurement: String!,
            status: Boolean
        ) : Submission
        updateSubmission (
            id: Int!,
            supervisor: Int!,
            lead: Int!,
            status: Boolean,
            rewardId: Int!
        ) : Submission
        
        addComment (
            id: Int!,
            content: String!,
            submission: Int!,
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
        ) : AreaAffected
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