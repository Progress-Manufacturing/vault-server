'use strict';
require('dotenv').config();
const server = require('./data/schema');
const express = require('express');
const expressHelper = require('./utils/express');
const errorHelper = require('./utils/errors');
const authHelper = require('./utils/auth');


// Create express application and set Port
const app = express();
const PORT = 8000;

// Configure Express
expressHelper.setup(app);

// Configure Authentication
authHelper.setup(app);

app.get('/graphql', authHelper.ensureAuthenticated, function(req, res, next) {
    next();
});

// Configure Errors
// errorHelper.setup(app);

// Graphql for testing the API out
server.applyMiddleware({
    app,
    cors: { credentials: true },
});
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphql`);
});