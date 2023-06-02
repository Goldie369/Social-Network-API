// Adding a router variable is an instance of the Express router, which allows you to define routes //
// he apiRoutes variable likely imports another router instance that handles the API routes for your application //


const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Any request to a route starting with /api will be forwarded to the apiRoutes router for further processing //
// If a request does not match any of the defined routes, it will trigger this middleware, which sends the response 'Oops! Wrong route.' //

router.use((req, res) => res.send('Oops! Wrong route.'));

module.exports = router;