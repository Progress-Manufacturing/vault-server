const { gql } = require('apollo-server-express');

const reward = gql`
    type Reward {
        id: Int!
        name: String!
        status: Boolean!
        description: String!
        submissions: [Submission]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    extend type Query {
        allRewards: [Reward]
        fetchReward(id: Int!): Reward
    }

    extend type Mutation {
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
module.exports = reward;