const { LeadInfo, User, Submission, Comment } = require('../../models');
require('dotenv').config();

const leadinfo = {
    Query: {
        // Fetch all lead information
        async allLeadInfo() {
            return await LeadInfo.findAll()
        },
        // Get a lead information by it ID
        async fetchLeadInfo(_, { id }) {
            return await LeadInfo.findByPk(id)
        },
        async fetchSubmissionLeadInfo(_, { submission }) {
            return await LeadInfo.find({ where: { submissionId: submission } })
        }

    },
    Mutation: {
        // Add new lead information
        async addLeadInfo(_, {
            submission,
            potentialStartDate,
            potentialEndDate,
            actualStartDate,
            actualEndDate,
            commentType,
            content
        }, { authScope }) {

            if (!authScope) {
                throw new Error('You must log in to continue!')
            }

            await Comment.create({
                userId: authScope.userId,
                content,
                commentType,
                submissionId: submission
            });

            return await LeadInfo.create({
                userId: authScope.userId,
                submissionId: submission,
                potentialStartDate,
                potentialEndDate,
                actualStartDate,
                actualEndDate
            });
        },
        // Update a particular lead information
        async updateLeadInfo(_, { id, actualStartDate, actualEndDate }) {
            // fetch the lead information by it ID
            const leadinfo = await LeadInfo.findByPk(id);
            // Update the lead information
            await leadinfo.update({
                actualStartDate,
                actualEndDate
            });
            return leadinfo;
        }
    },
    LeadInfo: {
        // Fetch the user of particular lead information
        async user(leadinfo) {
            return await User.findByPk(leadinfo.userId);
        },
        // Fetch all submission of lead information
        async submission(leadinfo) {
            return await Submission.findByPk(leadinfo.submissionId)
        }
    }
};

module.exports = leadinfo;