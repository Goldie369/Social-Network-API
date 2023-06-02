// The require statement imports the necessary modules: mongoose //
// The Schema and model objects are destructured from the mongoose module //
// Schema is defined using new Schema(), representing the user document structure //
// username: A required string field representing the username of the user //
// email: A required string field representing the email of the user //
// thoughts: An array field that holds Thought document references //
// Schema.Types.ObjectId and is associated with the Thought model //
// friends: An array field that holds User document references //
// Schema.Types.ObjectId and is associated with the User model //
// id: false disables the generation of an id virtual property for the schema //
// friendCount is added to the schema using userSchema.virtual() //
// It defines a getter function that returns the length of the friends array //
// User model is created using model('user', userSchema), where 'user' is the name of the model and userSchema is the defined schema //

const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true,
            trim: true, 
            unique: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true, 
            validate: {
                validator: function(v) {
                  return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v); //  match a valid email address
                },
                message: props => `${props.value} is not a valid email. Please try again!`
            },
        },
        thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                },
        ],
        friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User', 
                },
        ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );


userSchema
.virtual('friendCount')

.get(function () {
  return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;