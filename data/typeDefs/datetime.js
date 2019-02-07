const { gql } = require('apollo-server-express');

const dateTime = gql`
    scalar DateTime
`;

module.exports = dateTime;