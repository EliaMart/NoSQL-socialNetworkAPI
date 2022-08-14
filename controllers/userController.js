const { User, Thought } = require('../models ');

module.exports = {

// get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get a user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts', 'friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Add a new friend
    addUserFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res.status(404).json({ message: 'No friend with this id!' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove new friend
    removeUserFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res.status(404).json({ message: 'No friend with this id!' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },
};

