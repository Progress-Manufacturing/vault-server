const { gql } = require('apollo-server-express');

const event = gql`
    type Event {
        id: Int!
        user: User!
        progress: Progress!
        submission: Submission!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    extend type Query {
        allEvents: [Event]
        fetchEvent(id: Int!): Event
        fetchEventsBySubmission(submission: Int!): [Event]
    }

    extend type Mutation {
        addEvent (
            submission: Int!,
            user: Int!,
            progress: Int!
        ) : Event
    }
`;
module.exports = event;
