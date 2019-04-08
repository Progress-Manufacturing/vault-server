const { Submission, User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const submission = {
    Query: {
        // Submissions by Department
        async fetchDepartmentSubmissions(_, { dept, startTime, endTime }) {           
            return await Submission.findAll({ where: { department: dept, createdAt: { $between: [startTime,endTime] } } })
        },
        // All submissions
        async allSubmissions() {
            return await Submission.all()
        },
        async fetchNewAllSubmissions() {
            return await Submission.findAll({ where: { progressId: 1 } })
        },
        async fetchInProgressAllSubmissions() {
            return await Submission.findAll({ where: { progressId: { $between: [2,7] } } })
        },
        async fetchActiveAllSubmissions() {
            return await Submission.findAll({ where: { progressId: 8 } })
        },
        async fetchCompletedAllSubmissions() {
            return await Submission.findAll({ where: { progressId: 9 } })
        },
        // Supervisor Submissions
        async fetchSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { supervisor: uniqueId.oid } })
        },
        async fetchNewSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { supervisor: uniqueId.oid, progressId: 1 } })
        },
        async fetchInProgressSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { supervisor: uniqueId.oid, progressId: { $between: [2,7] } } })
        },
        async fetchActiveSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { supervisor: uniqueId.oid, progressId: 8 } })
        },
        async fetchCompletedSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { supervisor: uniqueId.oid, progressId: 9 } })
        },
        // Lead Submissions
        async fetchLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { lead: uniqueId.oid } })
        },
        async fetchNewLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { lead: uniqueId.oid, progressId: [6,7] } })
        },
        async fetchActiveLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { lead: uniqueId.oid, progressId: 8 } })
        },
        async fetchCompletedLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ where: { lead: uniqueId.oid, progressId: 9 } })
        },
        //User Submissions
        async fetchInProgressSubmissions(_, { userId }) {
            return await Submission.findAll({ where: { userId: userId, progressId: { $lt: 7 } } })
        },        
        async fetchActiveSubmissions(_, { userId }) {
            return await Submission.findAll({ where: { userId: userId, progressId: [7,8] } })
        },
        async fetchCompletedSubmissions(_, { userId }) {
            return await Submission.findAll({ where: {userId: userId, progressId: 9 } })
        },
        // Submission by ID
        async fetchSubmission(_, { id }) {
            return await Submission.findByPk(id)
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
                supervisor,
                department
            }, { authScope }) {
            
            if (!authScope) {
                throw new Error('You must log in to continue!')
            }

            const submission = await Submission.create({
                userId: authScope.userId,
                description,                
                improvementExplanation,
                proposedSolution,
                resourceExplanation,
                solutionMeasurement,
                supervisor: supervisor,
                department
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
            const submission = await Submission.findByPk(id);
            // Update the submission
            await submission.update({
                progressId: progress,
                approvalId: approval,
                improvementAreaTypeId: improvementAreaType,
                lead: lead,
                rewardId: reward
            });
            return submission;
        },
        async updateSubmissionSupervisorApproval (_, { id, progress, supervisorapproval, reward }) {
            // fetch the submission by it ID
            const submission = await Submission.findByPk(id);
            // Update the submission
            await submission.update({
                progressId: progress,
                supervisorApprovalId: supervisorapproval,
                rewardId: reward
            });
            return submission;
        },
        async updateSubmissionCommitteeApproval (_, { id, progress, approval, lead, reward }) {
            // fetch the submission by it ID
            const submission = await Submission.findByPk(id);
            // Update the submission
            await submission.update({
                progressId: progress,
                approvalId: approval,
                lead: lead,
                rewardId: reward
            });
            return submission;
        },
        async updateSubmissionLead (_, { id, lead }) {
            // fetch the submission by it ID
            const submission = await Submission.findByPk(id);
            // Update the submission
            await submission.update({
                progressId: progress,
                lead: lead
            });
            return submission;
        }
    },
    Submission: {
        // Fetch the user of a particular submission
        async user(submission) {
            return await User.findByPk(submission.userId);
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
        // Fetch the progress of a particular submission
        async progress(submission) {
            return await submission.getProgress();
        },
        // Fetch the supervisor approval of a particular submission
        async supervisorapproval(submission) {
            return await submission.getSupervisorApproval();
        },
        // Fetch the approval of a particular submission
        async approval(submission) {
            return await submission.getApproval();
        },
        // Fetch the reward of a particular submission
        async reward(submission) {
            return await submission.getReward();
        }
    }
};

module.exports = submission;