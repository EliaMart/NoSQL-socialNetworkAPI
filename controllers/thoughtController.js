const { Thought } = require('../models ');

module.exports = {

//   getUsers(req, res) {
//     User.find()
//     .select('-_V') 
//     .then((dbUserData) => {
//         res.json(dbUserData)
//     })
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json(err)
//     })
//   }

  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
    //   .populate('thoughts', 'friends')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
};