const { Submission, User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const submission = {
    Query: {
        // Fetch all submissions
        async allSubmissions() {
            return await Submission.all()
        },
        // Get a post by it ID
        async fetchSubmission(_, { id }) {
            return await Submission.findById(id);
        }
    },
    Mutation: {
         // Add a new submission
         async addSubmission(_, { 
                description,
                areas,
                wastes,
                improvements,
                improvementExplanation,
                proposedSolution,
                resources,
                resourceExplanation,
                solutionMeasurement,
                supervisor
            }, { authScope }) {
            
            if (!authScope) {
                throw new Error('You must log in to continue!')
            }


            console.info(supervisor)

            const submission = await Submission.create({
                userId: authScope.userId,
                description,                
                improvementExplanation,
                proposedSolution,
                resourceExplanation,
                solutionMeasurement,
                supervisorId: supervisor
            });
            // Assign necessary information to submission
            await Promise.all([                
                submission.setAreas(areas),                
                submission.setWastes(wastes),
                submission.setImprovements(improvements),
                submission.setResources(resources)
            ]);
            return submission;
        },
        // Update a particular submission
        async updateSubmission(_, { id, progress, approval, improvementAreaType, lead, reward }) {
            // fetch the submission by it ID
            const submission = await Submission.findById(id);
            // Update the submission
            await submission.update({
                progressId: progress,
                approvalId: approval,
                improvementAreaTypeId: improvementAreaType,
                leadId: lead,
                rewardId: reward,
            });
            return submission;
        }
    },
    Submission: {
        // Fetch the user of a particular submission
        async user(submission) {
            return await User.findById(submission.userId);
        },        
        // Fetch all areas affected that a submission belongs to
        async areas(submission) {
            return await submission.getAreas();
        },
        // Fetch all wastes that a submission belongs to
        async wastes(submission) {
            return await submission.getWastes();
        },
        // Fetch all improvements that a submission belongs to
        async improvements(submission) {
            return await submission.getImprovements();
        },
        // Fetch all improvements that a submission belongs to
        async resources(submission) {
            return await submission.getResources();
        },
        // Fetch the progress of a particulat submission
        async progress(submission) {
            return await submission.getProgress();
        },
        // Fetch the approval of a particular submission
        async approval(submission) {
            return await submission.getApproval();
        },
        // Fetch the lead of a particular submission
        async lead(submission) {
            return await User.findById(submission.leadId);
        },
        // Fetch the reward of a particular submission
        async reward(submission) {
            return await submission.getReward();
        }
    }
};

module.exports = submission;