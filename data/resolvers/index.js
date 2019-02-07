const user = require('./user');
const submission = require('./submission');
const approval = require('./approval');
const area = require('./area');
const comment = require('./comment');
const improvement = require('./improvement');
const progress = require('./progress');
const resource = require('./resource');
const reward = require('./reward');
const waste = require('./waste');
const datetime = require('./datetime');


const resolversArray = [
    user,
    submission,
    approval,
    area,
    comment,
    improvement,
    progress,
    resource,
    reward,
    waste,
    datetime
];

module.exports = resolversArray;