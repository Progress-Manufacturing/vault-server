'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { 
    User,
    Submission,
    AreasAffected,
    Process,
    Progress,
    Resource,
    Reward,
    Waste} = require('../models');
// const jwt = require('jsonwebtoken');
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
        async allComment() {
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
        async allWaste(_, args, { user }) {
            return await Waste.all();
        },
        // Get a waste by it ID
        async fetchWaste(_, { id }) {
            return await Waste.findById(id);
        },

        // Fetch all processes
        async allProcess(_, args, { user }) {
            return await Process.all();
        },
        // Get a process by it ID
        async fetchProcess(_, { id }) {
            return await Process.findById(id);
        },

        // Fetch all resources
        async allResource(_, args, { user }) {
            return await Process.all();
        },
        // Get a process by it ID
        async fetchResource(_, { id }) {
            return await Resource.findById(id);
        },

        // Fetch all rewards
        async allReward(_, args, { user }) {
            return await Reward.all();
        },
        // Get a process by it ID
        async fetchReward(_, { id }) {
            return await Reward.findById(id);
        },
    },
    Mutation: {
        // Create new user
        async createUser(_, { firstName, lastName, email, admin, supervisor, lead }) {
            return await User.create({
                firstName,
                lastName,
                email,
                admin,
                supervisor,
                lead
            });
        },
        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, admin, supervisor, lead  }) {
            // fetch the user by it ID
            const user = await User.findById(id);
            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                admin,
                supervisor,
                lead
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
            return await user.getSubmission();
        }
    },
    Submission: {
        // Fetch the author of a particular submission
        async user(submission) {
            return await submission.getUser();
        },
        // Fetch all areas affected that a submission belongs to
        async areasAffected(submission) {
            return await submission.getAreaAffected();
        },
        // Fetch all wastes that a submission belongs to
        async waste(submission) {
            return await submission.getWaste();
        },
        // Fetch all processes that a submission belongs to
        async process(submission) {
            return await submission.getProcess();
        },
        // Fetch all resources that a submission belongs to
        async resource(submission) {
            return await submission.getResource();
        },
        // Fetch all rewards that a submission belongs to
        async reward(submission) {
            return await submission.getReward();
        }
    },
    AreaAffected: {
        // Fetch all submissions belonging to a area affected
        async submissions(areaAffected) {
            return await areaAffected.getSubmission();
        }
    },
    Waste: {
        // Fetch all submissions belonging to a area affected
        async submissions(waste) {
            return await waste.getSubmission();
        }
    },
    Process: {
        // Fetch all submissions belonging to a process
        async submissions(process) {
            return await process.getSubmission();
        }
    },
    Resource: {
        // Fetch all submissions belonging to a resource
        async submissions(resource) {
            return await resource.getSubmission();
        }
    },
    Reward: {
        // Fetch all submissions belonging to a reward
        async submissions(reward) {
            return await reward.getSubmission();
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