const { Submission } = require('../../models');
require('dotenv').config();

const submission = {
    Query: {
        // Fetch all submissions
        async allSubmissions() {
            return await Submission.all();
        },
        // Get a post by it ID
        async fetchSubmission(_, { id }) {
            return await Submission.findById(id);
        }
    },
    Mutation: {
         // Add a new submission
         async addSubmission(_, { description, improvementExplanation, proposedSolution, resourceExplanation, solutionMeasurement, areas, wastes, improvements, resources, status }) {
            const submission = await Submission.create({
                userId: 1,
                description,                
                improvementExplanation,
                proposedSolution,
                resourceExplanation,
                solutionMeasurement,
                status
            });
            // Assign necessary information to submission
            await submission.setAreas(areas);
            await submission.setWastes(wastes);
            await submission.setImprovements(improvements);
            await submission.setResources(resources);
            return submission;
        },
        // Update a particular submission
        async updateSubmission(_, { id, supervisor, lead, reward, status }) {
            // fetch the submission by it ID
            const submission = await Submission.findById(id);
            // Update the submission
            await submission.update({
                supervisor,
                lead,               
                reward,
                status
            });
            return submission;
        }
    },
    Submission: {
        // Fetch the author of a particular submission
        async user(submission) {
            return await submission.getUser();
        },
        // Fetch all areas affected that a submission belongs to
        async areas(submission) {
            return await submission.getAreas();
        },
        async comments(submission) {
            return await submission.getComments();
        }

    }
};

module.exports = submission;