'use strict';
require('dotenv').config();
const server = require('./data/schema');
const express = require('express');
const expressHelper = require('./utils/express');
// const errorHelper = require('./utils/errors');
// const authHelper = require('./utils/auth');

// Create express application and set Port
const app = express();
const PORT = 8000;

// Configure Express
expressHelper.setup(app);

// Configure Authentication
// authHelper.setup(app);

// Configure Errors
// errorHelper.setup(app);

// Graphql for testing the API out
server.applyMiddleware({
    app,
    cors: true,
});
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphql`);
});