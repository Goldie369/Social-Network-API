// Adding Schema and Types objects are imported from the mongoose package //
// The dayjs library is imported for date manipulation and formatting //
// Adding advancedFormat plugin from dayjs is imported to enhance date formatting capabilities //
// Adding reactionSchema variable defines a new Schema using new Schema() //
// Adding reactionBody: A required string field representing the reaction body //
// username: A required string field representing the username associated with the reaction //
// createdAt: A date field representing the creation timestamp of the reaction //
// dateNow function is defined, which takes a createdAt date value and formats it using dayjs into the format "MMMM Do, YYYY at H:mm a" //


const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
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
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );


function dateNow (createdAt) {
  return `${dayjs(createdAt).format('MMMM Do, YYYY')} at ${dayjs(createdAt).format('H:mm a')}`
};

module.exports = reactionSchema;
  