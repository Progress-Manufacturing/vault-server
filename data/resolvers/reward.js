const { Reward } = require('../../models');
require('dotenv').config();

const reward = {
    Query: {
        // Fetch all rewards
        async allRewards(_, args, { user }) {
            return await Reward.all();
        },
        // Get an reward by it's ID
        async fetchReward(_, { id }) {
            return await Reward.findById(id);
        }
    },
    Mutation: {
        // Add new reward
        async addReward(_, { name, description }) {
            return await Reward.create({
                name,
                description
            });
        },
        // Update a particular reward
        async updateReward(_, { id, name, description, status  }) {
            // fetch the reward by it ID
            const reward = await Reward.findById(id);
            // Update the reward
            await reward.update({
                name,
                description,
                status
            });
            return reward;
        }
    },
    Reward: {
        // Fetch all submissions belonging to a reward
        async submissions(reward) {
            return await reward.getSubmission();
        }
    }
};

module.exports = reward;