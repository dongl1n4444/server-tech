const User = require('../models/user');

const users = {};

users.create = function(req, res) {
  return User
      .create({
        name: 'test',
        email: 'test@gmail.com',
        password: '1111'
      })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
};

module.exports = users;
