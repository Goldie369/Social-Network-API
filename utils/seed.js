// Adding a connection to a database using ../config/connection User and Thought models from ../models //
// The connection variable likely imports the database connection configuration from ../config/connection //
// The User and Thought variables imports the Mongoose models for the User and Thought schemas from ../models //
// The username variable likely imports the array of user data from ./data //


const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { username } = require('./data');

connection.on('error', (err) => err);
// vent listener for the error event of the database connection //
// Adding block listens for the open event of the database connection //
// Adding message to the console indicating that the connection is established //
// It deletes any existing data in the Thought and User collections using deleteMany() //
// It seeds the database with the user data from the username array using insertMany() //
// It logs the username array as a table in the console //
// It logs a message indicating that the data is seeded //

connection.once('open', async () => {

    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    
    await User.collection.insertMany(username);
    
    
    console.table(username);
    console.info('Data seeded.');
    process.exit(0);
});