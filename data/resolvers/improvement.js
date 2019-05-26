const { Improvement } = require('../../models');
require('dotenv').config();

const improvement = {
    Query: {
        // Fetch all improvements
        async allImprovements() {
            return await Improvement.findAll();
        },
        // Get an improvement by it's ID
        async fetchImprovement(_, { id }) {
            return await Improvement.findById(id);
        }
    },
    Mutation: {
        // Add new improvement
        async addImprovement(_, { name, description }) {
            return await Improvement.create({
                name,
                description
            });
        },
        // Update a particular improvement
        async updateImprovement(_, { id, name, description }) {
            // fetch the improvement by it's ID
            const improvement = await Improvement.findById(id);
            // Update the area affected
            await improvement.update({
                name,
                description
            });
            return improvement;
        }
    },
    Improvement: {
        // Fetch all submissions belonging to a improvement
        async submissions(improvement) {
            return await improvement.getSubmission();
        }
    }
};

module.exports = improvement;