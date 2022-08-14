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
};

