const { SupervisorApproval } = require('../../models');
require('dotenv').config();

const supervisorapproval = {
    Query: {
        // Fetch all supervisor approvals
        async allSupervisorApprovals() {
            return await SupervisorApproval.findAll();
        },
        // Get an supervisor approval by it's ID
        async fetchSupervisorApproval(_, { id }) {
            return await SupervisorApproval.findByPk(id);
        }
    },
    Mutation: {
        // Add new supervisor approval
        async addSupervisorApproval(_, { name, description }) {
            return await SupervisorApproval.create({
                name,
                description
            });
        },
        // Update a particular supervisor approval
        async updateSupervisorApproval(_, { id, name, description }) {
            // fetch the progress by it ID
            const supervisorapproval = await SupervisorApproval.findByPk(id);
            // Update the progress
            await supervisorapproval.update({
                name,
                description
            });
            return supervisorapproval;
        }
    },
    SupervisorApproval: {
        // Fetch all submissions belonging to a supervisor approval
        async submissions(supervisorapproval) {
            return await supervisorapproval.getSubmissions();
        }
    }
};

module.exports = supervisorapproval;