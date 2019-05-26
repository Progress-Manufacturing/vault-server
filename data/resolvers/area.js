const { Area } = require('../../models');
require('dotenv').config();

const area = {
    Query: {
        // Fetch all areas 
        async allAreas() {
            return await Area.findAll();
        },
        // Get an area by it's ID
        async fetchArea(_, { id }) {
            return await Area.findById(id);
        }
    },
    Mutation: {
        // Add new area affected
        async addArea(_, { name, description }) {
            return await Area.create({
                name,
                description
            });
        },
        // Update a particular area affected
        async updateArea(_, { id, name, description }) {
            // fetch the area affected by it's ID
            const area = await Area.findById(id);
            // Update the area affected
            await area.update({
                name,
                description
            });
            return area;
        }
    },
    Area: {
        // Fetch all submissions belonging to a area affected
        async submissions(area) {
            return await area.getSubmission();
        }
    }
};

module.exports = area;