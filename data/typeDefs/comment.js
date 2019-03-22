const { gql } = require('apollo-server-express');

const comment = gql`
    type Comment {
        id: Int!
        user: User!
        submission: Submission!
        content: String!
        commentType: Int!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allComments: [Comment]
        fetchComment(id: Int!): Comment
        fetchCommentsBySubmission(submission: Int!, commentType: Int!): [Comment]
    }

    extend type Mutation {
        addComment (
            submission: Int!,
            content: String!,
            commentType: Int!
        ) : Comment
        # TODO: Allow user to update comment?
    }
`;
module.exports = comment;
