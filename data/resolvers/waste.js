const { Waste } = require('../../models');
require('dotenv').config();

const waste = {
    Query: {
        // Fetch all wastes 
        async allWastes(_, args, { user }) {
            return await Waste.all();
        },
        // Get an waste by it's ID
        async fetchWaste(_, { id }) {
            return await Waste.findById(id);
        },
    },
    Mutation: {
        // Add new waste
        async addWaste(_, { name, description }) {
            return await Waste.create({
                name,
                description
            });
        },
        // Update a particular waste
        async updateWaste(_, { id, name, description }) {
            // fetch the waste by it's ID
            const waste = await Waste.findById(id);
            // Update the waste
            await waste.update({
                name,
                description
            });
            return waste;
        }
    },
    Waste: {
        // Fetch all submissions belonging to a waste
        async submissions(waste) {
            return await waste.getSubmission();
        }
    }
};

module.exports = waste;