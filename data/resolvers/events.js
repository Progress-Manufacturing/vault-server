const { Events, User, Submission } = require('../../models');
require('dotenv').config();

const event = {
    Query: {
        // Fetch all Events
        async allEvents() {
            return await Event.findAll();
        },
        // Get an event by it's ID
        async fetchEvent(_, { id }) {
            return await Event.findById(id);
        },
        async fetchEventsBySubmission(_, { submission }) {
            return await Event.findAll({ where: { submissionId: submission } });
        }        
    },
    Mutation: {
        // Add new event
        async addEvent(_, { user, submission, progress }, { authScope }) {
            if (!authScope) {
                throw new Error('You must log in to continue!')
            }

            return await Event.create({
                userId: authScope.userId,
                submissionId: submission,
                progressId: progress
            });            
        }
    },
    Event: {
        // Fetch the user of a particular comment
        async user(event) {
            return await User.findByPk(event.userId);
        },
        async submission(event) {
            return await Submission.findByPk(event.submissionId);
        }
    }
};

module.exports = event;