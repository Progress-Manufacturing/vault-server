// server.js
'use strict';
const express = require('express');
const schema = require('./data/schema');
require('dotenv').config();
const PORT = 3000;
// Create our express app
const app = express();
// Graphql endpoint

app.use('/api', jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
}))

// Graphiql for testing the API out
schema.applyMiddleware({app});
schema.apply
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphql`);
});