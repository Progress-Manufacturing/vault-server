const { SupApproval } = require('../../models')
require('dotenv').config();

const supapproval = {
    Query: {
        // Fetch all supervisor approvals
        async allSupApprovals(_, args, { user }) {
            return await SupApproval.all();
        },
        // Get an supervisor approval by it's ID
        async fetchSupApproval(_, { id }) {
            return await SupApproval.findByPk(id);
        }
    },
    Mutation: {
        // Add new supervisor approval
        async addSupApproval(_, { name, description }) {
            return await SupApproval.create({
                name,
                description
            });
        },
        // Update a particular supervisor approval
        async updateSupApproval(_, { id, name, description, status  }) {
            // fetch the approval by it ID
            const supapproval = await SupApproval.findByPk(id);
            // Update the Approval
            await supapproval.update({
                name,
                description,
                status
            });
            return supapproval;
        }
    },
    SupApproval: {
        // Fetch all submissions belonging to a approval
        async submissions(supapproval) {
            return await supapproval.getSubmissions();
        }
    }
};

module.exports = supapproval;