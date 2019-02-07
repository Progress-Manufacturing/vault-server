const { Comment } = require('../../models');
require('dotenv').config();

const comment = {
    Query: {
        // Fetch all Comments
        async allComments(_, args, { user }) {
            return await Comments.all();
        },
        // Get an approval by it's ID
        async fetchComment(_, { id }) {
            return await Comment.findById(id);
        }
    },
    Mutation: {
        // Add new comment
        async addComment(_, { content }) {
            return await Comment.create({
                name,
                description
            });
        }
        // TODO: allow users to edit/delete their comments
    }
};

module.exports = comment;