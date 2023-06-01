const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const dayjs = require('dayjs');

var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: dateNow,
        },
        reactions: [ Reaction ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);


function dateNow (createdAt) {
    return `${dayjs(createdAt).format('MMMM Do, YYYY')} at ${dayjs(createdAt).format('H:mm a')}`
};


thoughtSchema
.virtual('reactionCount')

.get(function () {
    return this.reactions.length;
});



const Thought = model('thought', thoughtSchema);

module.exports = Thought;