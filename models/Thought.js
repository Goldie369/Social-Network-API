// Adding a require statements import necessary modules: mongoose, Reaction (previously defined schema), and dayjs //
// Adding Schema and model objects are destructured from the mongoose module //
// Adding advancedFormat plugin is added to dayjs using dayjs.extend(advancedFormat) //
// schema is defined using new Schema(), representing the thought document structure //
// thoughtText: A required string field representing the thought text //
// username: A required string field representing the username associated with the thought //
// createdAt: A date field representing the creation timestamp of the thought //
// reactions: An array field that holds reaction documents. Each reaction is defined by the Reaction schema //
// dateNow function is defined, which takes a createdAt date value and formats it using dayjs into the format "MMMM Do, YYYY at H:mm a" //
// Thought model is created using model('thought', thoughtSchema), where 'thought' is the name of the model and thoughtSchema is the defined schema //

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