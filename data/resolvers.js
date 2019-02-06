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