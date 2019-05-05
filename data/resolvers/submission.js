const { Submission, Comment, User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const submission = {
    Query: {
        // Submissions by Department
        async fetchDepartmentSubmissions(_, { dept, startTime, endTime }) {           
            return await Submission.findAll({ 
                where: { department: dept, createdAt: { $between: [startTime,endTime] } },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        // All submissions
        async allSubmissions() {
            return await Submission.all()
        },
        async fetchNewAllSubmissions() {
            return await Submission.findAll({ 
                where: { progressId: 1 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchInProgressAllSubmissions() {
            return await Submission.findAll({ 
                where: { progressId: { $between: [2,7] } },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchActiveAllSubmissions() {
            return await Submission.findAll({ 
                where: { progressId: 8 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchCompletedAllSubmissions() {
            return await Submission.findAll({ 
                where: { progressId: 9 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        // Supervisor Submissions
        async fetchSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { supervisor: uniqueId.oid },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchNewSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { supervisor: uniqueId.oid, progressId: 1 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchInProgressSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { supervisor: uniqueId.oid, progressId: { $between: [2,7] } },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchActiveSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { supervisor: uniqueId.oid, progressId: 8 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchCompletedSupervisorSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { supervisor: uniqueId.oid, progressId: 9 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        // Lead Submissions
        async fetchLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { lead: uniqueId.oid },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchNewLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { lead: uniqueId.oid, progressId: [6,7] },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchActiveLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { lead: uniqueId.oid, progressId: 8 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchCompletedLeadSubmissions(parent, args, context, info) {
            const uniqueId = jwt.decode(context.authScope.idToken)
            return await Submission.findAll({ 
                where: { lead: uniqueId.oid, progressId: 9 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        //User Submissions
        async fetchInProgressSubmissions(_, { userId }) {
            return await Submission.findAll({ 
                where: { userId: userId, progressId: { $lt: 7 } }, 
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },        
        async fetchActiveSubmissions(_, { userId }) {
            return await Submission.findAll({
                where: { userId: userId, progressId: [7,8] },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        async fetchCompletedSubmissions(_, { userId }) {
            return await Submission.findAll({ 
                where: {userId: userId, progressId: 9 },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
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
        async addSubmissionSupervisorApproval (_, { 
                submissionId,
                progress,
                supervisorapproval,
                content,
                commentType,
                reward 
            }, { authScope }) {
            
            if (!authScope) {
                throw new Error('You must log in to continue!')
            }

            // fetch the submission by it ID
            const submission = await Submission.findByPk(submissionId);
            // Update the submission
            await submission.update({
                progressId: progress,
                supervisorApprovalId: supervisorapproval,
                rewardId: reward
            });

            await Comment.create({
                userId: authScope.userId,
                content,
                commentType,
                submissionId: submissionId
            });

            return submission;
        },
        async addSubmissionCommitteeApproval (_, { 
            submissionId, 
            progress,
            approval,
            lead,
            content,
            commentType,
            improvementAreaType,
            reward 
        }, { authScope }) {

            if (!authScope) {
                throw new Error('You must log in to continue!')
            }

            // fetch the submission by it ID
            const submission = await Submission.findByPk(submissionId);
            // Update the submission
            await submission.update({
                progressId: progress,
                approvalId: approval,
                lead: lead,
                improvementAreaTypeId: improvementAreaType,
                rewardId: reward
            });

            await Comment.create({
                userId: authScope.userId,
                content,
                commentType,
                submissionId: submissionId
            })
           
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
        },
        // Fetch the improvement area type
        async improvementAreaType(submission) {
            return await submission.getImprovementAreaType();
        }
    }
};

module.exports = submission;