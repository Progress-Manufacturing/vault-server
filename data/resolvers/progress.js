const { Progress } = require('../../models');
require('dotenv').config();

const progress = {
    Query: {
        // Fetch all progresses
        async allProgresses() {
            return await Progress.findAll();
        },
        // Get an progress by it's ID
        async fetchProgress(_, { id }) {
            return await Progress.findByPk(id);
        }
    },
    Mutation: {
        // Add new progress
        async addProgress(_, { name, step, description }) {
            return await Progress.create({
                name,
                step,
                description
            });
        },
        // Update a particular progress
        async updateProgress(_, { id, name, step, description }) {
            // fetch the progress by it ID
            const progress = await Progress.findByPk(id);
            // Update the progress
            await progress.update({
                name,
                step,
                description,
                status
            });
            return progress;
        }
    },
    Progress: {
        // Fetch all submissions belonging to a progress
        async submissions(progress) {
            return await progress.getSubmissions();
        }
    }
};

module.exports = progress;