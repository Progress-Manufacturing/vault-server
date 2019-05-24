const { Message } = require('../../models');
require('dotenv').config();

const message = {
    Query: {
        // Fetch all messages
        async allMessages() {
            return await Message.all();
        },
        // Get a message by it ID
        async fetchMessage(_, { id }) {
            return await Message.findById(id);
        }
    },
    Mutation: {
         // Add a new message
         async addMessage(_, { 
                name,
                message
            }) {
            const userMessage = await Submission.create({
                name,                
                message
            });
            
            return userMessage;
        },
        // Update a particular message
        async updateMessage(_, { id, name, message }) {
            // fetch the message by it ID
            const userMessage = await Message.findById(id);
            // Update the message
            await userMessage.update({
                name,
                message
            });
            return userMessage;
        }
    }
};

module.exports = message;