const { gql } = require('apollo-server-express');

const comment = gql`
    type Comment {
        id: Int!
        content: String!
        user: User!
        submission: Submission!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allComments: [Comment]
        fetchComment(id: Int!): Comment
    }

    extend type Mutation {
        addComment (
            content: String!,
            user: Int!,
            status: Boolean
        ) : Comment
        # TODO: All user to update comment?
    }
`;
module.exports = comment;
