const { ImprovementAreaType } = require('../../models');
require('dotenv').config();

const improvementareatype = {
    Query: {
        // Fetch all improvement area types
        async allImprovementAreaTypes() {
            return await ImprovementAreaType.findAll();
        },
        // Get an improvement area type by it's ID
        async fetchImprovementAreaType(_, { id }) {
            return await ImprovementAreaType.findById(id);
        }
    },
    Mutation: {
        // Add new improvement area type
        async addImprovementAreaType(_, { name, description }) {
            return await ImprovementAreaType.create({
                name,
                description
            });
        },
        // Update a particular improvement area type
        async updateImprovementAreaType(_, { id, name, description }) {
            // fetch the improvement area type by it's ID
            const improvementareatype = await ImprovementAreaType.findById(id);
            // Update the area affected
            await improvement.update({
                name,
                description
            });
            return improvementareatype;
        }
    },
    ImprovementAreaType: {
        // Fetch all submissions belonging to a improvement area type
        async submissions(improvementareatype) {
            return await improvementareatype.getSubmission();
        }
    }
};

module.exports = improvementareatype;