'use strict';
require('dotenv').config();
const server = require('./data/schema');
const cors = require('cors')
const express = require('express');
const expressHelper = require('./utils/express');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // <-- REQUIRED backend setting
};
  
// Create express application and set Port
const app = express();
const PORT = 8000;

// Configure Express
expressHelper.setup(app);

// CORS Setup
app.use(cors(corsOptions));

// Graphql for testing the API out
server.applyMiddleware({
    app,
    cors: true,
});
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphql`);
});