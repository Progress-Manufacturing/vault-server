'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { 
    User,
    CI_Submission,
    CI_Area,
    CI_Waste, 
    CI_Improvement,
    CI_Resource,
    CI_Reward,
    CI_Approval,
    CI_Comment,
    CI_Progress
    } = require('../models');
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
            return await CI_Submission.all();
        },
        // Get a post by it ID
        async fetchSubmission(_, { id }) {
            return await CI_Submission.findById(id);
        },
        // Fetch all areas 
        async allAreas(_, args, { user }) {
            return await CI_Area.all();
        },
        // Get an area by it's ID
        async fetchArea(_, { id }) {
            return await CI_Area.findById(id);
        },
        // Fetch all wastes 
        async allWastes(_, args, { user }) {
            return await CI_Waste.all();
        },
        // Get an waste by it's ID
        async fetchWaste(_, { id }) {
            return await CI_Waste.findById(id);
        },
        // Fetch all improvements
        async allImprovements(_, args, { user }) {
            return await CI_Improvement.all();
        },
        // Get an improvement by it's ID
        async fetchImprovement(_, { id }) {
            return await CI_Improvement.findById(id);
        },
        // Fetch all resources
        async allResources(_, args, { user }) {
            return await CI_Resource.all();
        },
        // Get an resource by it's ID
        async fetchResource(_, { id }) {
            return await CI_Resource.findById(id);
        },
        // Fetch all rewards
        async allRewards(_, args, { user }) {
            return await CI_Rewards.all();
        },
        // Get an reward by it's ID
        async fetchReward(_, { id }) {
            return await CI_Reward.findById(id);
        },
        // Fetch all approvals
        async allApprovals(_, args, { user }) {
            return await CI_Approvals.all();
        },
        // Get an approval by it's ID
        async fetchApproval(_, { id }) {
            return await CI_Approval.findById(id);
        },
        // Fetch all Comments
        async allComments(_, args, { user }) {
            return await CI_Comments.all();
        },
        // Get an approval by it's ID
        async fetchComment(_, { id }) {
            return await CI_Comment.findById(id);
        },
        // Fetch all progresses
        async allProgresses(_, args, { user }) {
            return await CI_Progresses.all();
        },
        // Get an progress by it's ID
        async fetchProgress(_, { id }) {
            return await CI_Progress.findById(id);
        }
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
        async addSubmission(_, { description, improvementExplanation, proposedSolution, resourceExplanation, solutionMeasurement, areas, status }) {
            const user = await User.findOne({ where: { id: user.id } });
            const submission = await CI_Submission.create({
                userId: user.id,
                description,                
                improvementExplanation,
                proposedSolution,
                resourceExplanation,
                solutionMeasurement,
                status
            });
            // Assign necessary information to submission
            await submission.setAreas(areas);
            return submission;
        },
        // Update a particular submission
        async updateSubmission(_, { id, supervisor, lead, reward, status }) {
            // fetch the submission by it ID
            const submission = await CI_Submission.findById(id);
            // Update the submission
            await submission.update({
                supervisor,
                lead,               
                reward,
                status
            });
            return submission;
        },
        // Add new area affected
        async addArea(_, { name, description }) {
            return await CI_Area.create({
                name,
                description
            });
        },
        // Update a particular area affected
        async updateArea(_, { id, name, description }) {
            // fetch the area affected by it's ID
            const area = await CI_Area.findById(id);
            // Update the area affected
            await area.update({
                name,
                description
            });
            return area;
        },
        // Add new waste
        async addWaste(_, { name, description }) {
            return await CI_Waste.create({
                name,
                description
            });
        },
        // Update a particular waste
        async updateWaste(_, { id, name, description }) {
            // fetch the waste by it's ID
            const waste = await CI_Waste.findById(id);
            // Update the area affected
            await waste.update({
                name,
                description
            });
            return waste;
        },
        // Add new improvement
        async addImprovement(_, { name, description }) {
            return await CI_Improvement.create({
                name,
                description
            });
        },
        // Update a particular improvement
        async updateImprovement(_, { id, name, description }) {
            // fetch the improvement by it's ID
            const improvement = await CI_Improvement.findById(id);
            // Update the area affected
            await improvement.update({
                name,
                description
            });
            return improvement;
        },
        // Add new resource
        async addResource(_, { name, description }) {
            return await CI_Resource.create({
                name,
                description
            });
        },
        // Update a particular resource
        async updateResource(_, { id, name, description }) {
            // fetch the resource by it's ID
            const resource = await CI_Resource.findById(id);
            // Update the area affected
            await resource.update({
                name,
                description
            });
            return resource;
        },
        // Add new reward
        async addReward(_, { name, description }) {
            return await CI_Reward.create({
                name,
                description
            });
        },
        // Update a particular reward
        async updateReward(_, { id, name, description, status  }) {
            // fetch the reward by it ID
            const reward = await CI_Reward.findById(id);
            // Update the reward
            await reward.update({
                name,
                description,
                status
            });
            return reward;
        },
        // Add new approval
        async addApproval(_, { name, description }) {
            return await CI_Approval.create({
                name,
                description
            });
        },
        // Update a particular approval
        async updateApproval(_, { id, name, description, status  }) {
            // fetch the approval by it ID
            const approval = await CI_Approval.findById(id);
            // Update the Approval
            await approval.update({
                name,
                description,
                status
            });
            return approval;
        },
        // Add new comment
        async addComment(_, { content }) {
            return await CI_Comment.create({
                name,
                description
            });
        },
        // Add new progress
        async addProgress(_, { name, step, description }) {
            return await CI_Progress.create({
                name,
                step,
                description
            });
        },
        // Update a particular progress
        async updateProgress(_, { id, name, step, description  }) {
            // fetch the progress by it ID
            const progress = await CI_Progress.findById(id);
            // Update the progress
            await progress.update({
                name,
                step,
                description,
                status
            });
            return progress;
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
        async areas(submission) {
            return await submission.getAreas();
        },
        async comments(submission) {
            return await submission.getComments();
        }

    },
    Area: {
        // Fetch all submissions belonging to a area affected
        async submissions(area) {
            return await area.getSubmission();
        }
    },
    Waste: {
        // Fetch all submissions belonging to a waste
        async submissions(waste) {
            return await waste.getSubmission();
        }
    },
    Improvement: {
        // Fetch all submissions belonging to a improvement
        async submissions(improvement) {
            return await improvement.getSubmission();
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
    Approval: {
        // Fetch all submissions belonging to a approval
        async submissions(approval) {
            return await approval.getSubmission();
        }
    },    
    Progress: {
        // Fetch all submissions belonging to a progress
        async submissions(progress) {
            return await progress.getSubmission();
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