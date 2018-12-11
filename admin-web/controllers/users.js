const User = require('../models/user');

module.exports = {
  create(req, res) {
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
          res.status(400).send(error)
        });
  }
};
