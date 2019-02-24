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
            const message = await Submission.create({
                name,                
                message
            });
            
            return message;
        },
        // Update a particular message
        async updateMessage(_, { id, name, message }) {
            // fetch the message by it ID
            const message = await Message.findById(id);
            // Update the message
            await message.update({
                name,
                message
            });
            return message;
        }
    }
};

module.exports = message;