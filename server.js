// Import necessary dependencies //

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// The PORT variable specifies the port on which the server will listen //

const PORT = process.env.PORT || 3001;
const app = express();

// The express.urlencoded middleware parses incoming requests with URL //
// It populates the req.body property with the parsed data //
// Set up routes //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// This code block listens for the open event of the db connection //
// The callback function inside app.listen is executed when the server starts and logs a message indicating that the server is running //

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`App on http://localhost:${PORT}`);
    });
  });
  