const { Comment, User, Submission } = require('../../models');
require('dotenv').config();

const comment = {
    Query: {
        // Fetch all Comments
        async allComments(_, args, { user }) {
            return await Comment.all();
        },
        // Get an comment by it's ID
        async fetchComment(_, { id }) {
            return await Comment.findById(id);
        },
        async fetchCommentsBySubmission(_, { submission, commentType }) {
            return await Comment.findAll({ where: { submissionId: submission, commentType: commentType } })
        }
    },
    Mutation: {
        // Add new comment
        async addComment(_, { user, content, commentType, submission }, { authScope }) {
            console.info('scope: ', authScope);
            if (!authScope) {
                throw new Error('You must log in to continue!')
            }

            const currentUser = await User.findOne({ where: { oid: authScope.oid } });
            const userId = currentUser.id;

            return await Comment.create({
                userId: userId,
                content,
                commentType,
                submissionId: submission
            });
        }
    },
    Comment: {
        // Fetch the user of a particular comment
        async user(comment) {
            return await User.findByPk(comment.userId);
        },
        async submission(comment) {
            return await Submission.findByPk(comment.submissionId);
        }
    }
};

module.exports = comment;