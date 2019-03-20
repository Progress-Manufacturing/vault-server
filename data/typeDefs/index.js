const root = require('./root');
const datetime = require('./datetime');
const user = require('./user');
const submission = require('./submission');
const comment = require('./comment');
const approval = require('./approval');
const supapproval = require('./supapproval');
const area = require('./area');
const improvement = require('./improvement');
const improvementAreaType = require('./improvementareatype');
const progress = require('./progress');
const resource = require('./resource');
const reward = require('./reward');
const waste = require('./waste');
const message = require('./message');

const schemaArray = [
    root,
    datetime,
    user,
    submission,
    comment,
    approval,
    supapproval,
    area,
    improvement,
    improvementAreaType,
    progress,
    resource,
    reward,
    waste,
    message
];

module.exports = schemaArray;