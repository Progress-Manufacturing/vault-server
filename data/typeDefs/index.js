const root = require('./root');
const datetime = require('./datetime');
const user = require('./user');
const submission = require('./submission');
const comment = require('./comment');
const approval = require('./approval');
const area = require('./area');
const improvement = require('./improvement');
const progress = require('./progress');
const resource = require('./resource');
const reward = require('./reward');
const waste = require('./waste');

const schemaArray = [
    root,
    datetime,
    user,
    submission,
    comment,
    approval,
    area,
    improvement,
    progress,
    resource,
    reward,
    waste
];

module.exports = schemaArray;