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
    Mutation: {
        // Create new user
        async createUser(_, { firstName, lastName, email, password }) {
            return await User.create({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });
        },
        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, password }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }
            // fetch the user by it ID
            const user = await User.findById(id);
            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });
            return user;
        },
        // Add a new submission
        async addSubmission(_, { description, areasAffected, wastesSeen, processImproved, proposedSolution, resourcesNeeded, resourcesExplanation, solutionMeasurement, status }) {
            const user = await User.findOne({ where: { id: authUser.id } });
            const submission = await Submission.create({
                userId: user.id,
                description,                
                improvementExplanation,
                proposedSolution,
                resourcesExplanation,
                solutionMeasurement,
                status
            });
            // Assign necessary information to submission
            await submission.setTags(areasAffected);
            await submission.setTags(wastesSeen);
            await submission.setTags(processImproved);
            await submission.setTags(resourcesNeeded);
            return submission;
        },
        // Update a particular submission
        async updateSubmission(_, { id, supervisor, lead, status, rewardId }) {
            // fetch the submission by it ID
            const submission = await Submission.findById(id);
            // Update the submission
            await submission.update({
                supervisor,
                lead,               
                rewardId,
                status
            });
            return submission;
        },
        // Add a new comment
        async addComment(_, { content }) {
            return await Comment.create({
                content
            });
        },
        // Add new area affected
        async addAreaAffected(_, { name, description }) {
            return await AreaAffected.create({
                name,
                description
            });
        },
        // Update a particular area affected
        async updateAreaAffected(_, { id, name, description }) {
            // fetch the area affected by it's ID
            const areaAffected = await AreaAffected.findById(id);
            // Update the area affected
            await areaAffected.update({
                name,
                description
            });
            return areaAffected;
        },
        // Add new waste
        async addWaste(_, { name, description }) {
            return await Waste.create({
                name,
                description
            });
        },
        // Update a particular waste
        async updateWaste(_, { id, name, description }) {
            // fetch the waste by it's ID
            const waste = await Waste.findById(id);
            // Update the waste
            await waste.update({
                name,
                description
            });
            return waste;
        },
        // Add new process
        async addProcess(_, { name, description }) {
            return await Process.create({
                name,
                description
            });
        },
        // Update a particular process
        async updateProcess(_, { id, name, description }) {
            // fetch the process by it's ID
            const process = await Process.findById(id);
            // Update the process
            await process.update({
                name,
                description
            });
            return process;
        },
        // Add new resource
        async addResource(_, { name, description }) {
            return await Resource.create({
                name,
                description
            });
        },
        // Update a particular resource
        async updateResource(_, { id, name, description }) {
            // fetch the resource by it's ID
            const resource = await Resource.findById(id);
            // Update the resource
            await resource.update({
                name,
                description
            });
            return resource;
        },
        // Add new reward
        async addReward(_, { name, description }) {
            return await Reward.create({
                name,
                description
            });
        },
        // Update a particular reward
        async updateReward(_, { id, name, description }) {
            // fetch the reward by it's ID
            const reward = await Reward.findById(id);
            // Update the reward
            await reward.update({
                name,
                description
            });
            return reward;
        },
    },
    User: {
        // Fetch all submissions created by a user
        async submissions(user) {
            return await user.getSubmissions();
        }
    },
    Submission: {
        // Fetch the author of a particular submission
        async user(submission) {
            return await submission.getUser();
        },
        // Fetch all areas affected that a submission belongs to
        async areasAffected(submission) {
            return await submission.getAreasAffected();
        },
        // Fetch all wastes that a submission belongs to
        async wastes(submission) {
            return await submission.getWastes();
        },
        // Fetch all processes that a submission belongs to
        async processes(submission) {
            return await submission.getProcesses();
        },
        // Fetch all resources that a submission belongs to
        async resources(submission) {
            return await submission.getResources();
        },
        // Fetch all rewards that a submission belongs to
        async rewards(submission) {
            return await submission.getRewards();
        }
    },
    AreaAffected: {
        // Fetch all submissions belonging to a area affected
        async submission(areaAffected) {
            return await areaAffected.getSubmissions();
        }
    },
    Waste: {
        // Fetch all submissions belonging to a area affected
        async submission(waste) {
            return await waste.getSubmissions();
        }
    },
    Process: {
        // Fetch all submissions belonging to a process
        async submission(process) {
            return await process.getSubmissions();
        }
    },
    Resource: {
        // Fetch all submissions belonging to a resource
        async submission(resource) {
            return await resource.getSubmissions();
        }
    },
    Reward: {
        // Fetch all submissions belonging to a reward
        async submission(reward) {
            return await reward.getSubmissions();
        }
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'DateTime type',
        parseValue(value) {
            // value from the client
            return new Date(value);
        },
        serialize(value) {
            const date = new Date(value);
            // value sent to the client
            return date.toISOString();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // ast value is always in string format
                return parseInt(ast.value, 10);
            }
            return null;
        }
    })
}
module.exports = resolvers;