const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction
} = require('../../controllers/thoughtController');

const { update } = require('../../models /User');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThoughtReaction);


// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);


module.exports = router;