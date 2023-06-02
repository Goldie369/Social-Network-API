// Routes //
// Adding a router variable is an instance of the Express router, which allows you to define routes //
//  apiRoutes variable likely imports another router instance that handles the API routes for your application //

// Adding router variable is an instance of the Express router //
// he require('../../controllers/thoughtController') imports an object that contains functions for handling different operations related to thoughts and reactions //

const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');


router.route('/')
  .get(getThoughts)
  .post(createThought);


router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


router.route('/:thoughtId/reactions').post(createReaction);


router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
