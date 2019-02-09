'use strict';
const express = require('express');
const schema = require('./data/schema');
require('dotenv').config();
const PORT = 8000;
const app = express();

// Graphiql for testing the API out
schema.applyMiddleware({app});
schema.apply
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphql`);
});