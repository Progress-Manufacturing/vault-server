const { Approval } = require('../../models')
require('dotenv').config();

const approval = {
    Query: {
        // Fetch all approvals
        async allApprovals(_, args, { user }) {
            return await Approval.all();
        },
        // Get an approval by it's ID
        async fetchApproval(_, { id }) {
            return await Approval.findByPk(id);
        }
    },
    Mutation: {
        // Add new approval
        async addApproval(_, { name, description }) {
            return await Approval.create({
                name,
                description
            });
        },
        // Update a particular approval
        async updateApproval(_, { id, name, description, status  }) {
            // fetch the approval by it ID
            const approval = await Approval.findByPk(id);
            // Update the Approval
            await approval.update({
                name,
                description,
                status
            });
            return approval;
        }
    },
    Approval: {
        // Fetch all submissions belonging to a approval
        async submissions(approval) {
            return await approval.getSubmission();
        }
    }
};

module.exports = approval;