const { Resource } = require('../../models');
require('dotenv').config();

const resource = {
    Query: {
        // Fetch all resources
        async allResources(_, args, { user }) {
            return await Resource.all();
        },
        // Get an resource by it's ID
        async fetchResource(_, { id }) {
            return await Resource.findById(id);
        }
    },
    Mutation: {
        // Add new resource
        async addResource(_, { name, description }) {
            return await Resource.create({
                name,
                description
            });
        },
        // Update a particular resource
        async updateResource(_, { id, name, description }) {
            // fetch the resource by it's ID
            const resource = await Resource.findById(id);
            // Update the area affected
            await resource.update({
                name,
                description
            });
            return resource;
        }
    },
    Resource: {
        // Fetch all submissions belonging to a resource
        async submissions(resource) {
            return await resource.getSubmission();
        }
    }
};

module.exports = resource;