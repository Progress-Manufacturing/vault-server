'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { 
    User,
    Submission,
    AreasAffected,
    Processes,
    Progress,
    Resources,
    Reward,
    Wastes} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');
require('dotenv').config();

const resolvers = {
    Query: {
        // Fetch all users
        async allUsers() {
            return await User.all();
        },
        // Get a user by it ID
        async fetchUser(_, { id }) {
            return await User.findById(id);
        },

        // Fetch all submissions
        async allSubmissions() {
            return await Submission.all();
        },
        // Get a post by it ID
        async fetchSubmission(_, { id }) {
            return await Submission.findById(id);
        },

        // Fetch all comments
        async allComments() {
            return await Comment.all();
        },
        // Get a comment by ID
        async fetchComment(_, { id }) {
            return await Comment.findById(id);
        },

        // Fetch all areas affected
        async allAreasAffected(_, args, { user }) {
            return await AreasAffected.all();
        },
        // Get a area affected by it ID
        async fetchAreaAffected(_, { id }) {
            return await AreaAffected.findById(id);
        },

        // Fetch all wastes
        async allWastes(_, args, { user }) {
            return await Waste.all();
        },
        // Get a waste by it ID
        async fetchWaste(_, { id }) {
            return await Waste.findById(id);
        },

        // Fetch all processes
        async allProcesses(_, args, { user }) {
            return await Process.all();
        },
        // Get a process by it ID
        async fetchProcess(_, { id }) {
            return await Process.findById(id);
        },

        // Fetch all resources
        async allResources(_, args, { user }) {
            return await Process.all();
        },
        // Get a process by it ID
        async fetchResource(_, { id }) {
            return await Resource.findById(id);
        },

        // Fetch all rewards
        async allRewards(_, args, { user }) {
            return await Reward.all();
        },
        // Get a process by it ID
        async fetchReward(_, { id }) {
            return await Reward.findById(id);
        },


    },
}
module.exports = resolvers;