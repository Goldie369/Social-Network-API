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