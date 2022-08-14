const { Thought } = require('../models ');

module.exports = {
    
  // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((thought) => {
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

  // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought found with this id' })
              : res.json(thought)
          )
          .catch((err) => res.status(400).json(err));
      
      },
    
    // create a thought 
      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
          });
      },

    // update a thought
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // delete a thought
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    // create a reaction
      addThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body} },
          { runValidators: true, new: true }
        )
          .then((reaction) =>
            !reaction
              ? res.status(404).json({ message: 'No reaction with this id!' })
              : res.json(reaction)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Remove reaction by ID
      removeThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((reaction) =>
            !reaction
              ? res.status(404).json({ message: 'No reaction with this id!' })
              : res.json(reaction)
          )
          .catch((err) => res.status(500).json(err));
      },
};

