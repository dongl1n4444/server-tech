'use strict';

const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  name: Sequelize.STRING(50),
  email: Sequelize.STRING,
  password: Sequelize.STRING(50),
  salt: Sequelize.STRING(50)
});

User.create = () => {
  console.log('User create');
};

module.exports = User;
