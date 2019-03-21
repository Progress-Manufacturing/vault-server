const user = require('./user');
const submission = require('./submission');
const approval = require('./approval');
const supervisorapproval = require('./supervisorapproval');
const area = require('./area');
const comment = require('./comment');
const improvement = require('./improvement');
const improvementAreaType = require('./improvementareatype');
const progress = require('./progress');
const resource = require('./resource');
const reward = require('./reward');
const waste = require('./waste');
const message = require('./message');
const datetime = require('./datetime');


const resolversArray = [
    user,
    submission,
    approval,
    area,
    comment,
    improvement,
    improvementAreaType,
    progress,
    supervisorapproval,
    resource,
    reward,
    waste,
    message,
    datetime
];

module.exports = resolversArray;