'use strict';
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    salt: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate = function(user, options) {
    console.log('before hashPassword: ' + user.password);
    user.password = hashPassword(user.password);
    console.log('after hashPassword: ' + user.password);
  };
  User.prototype.validPassword = function(password) {
    //
  };
  return User;
};

function hashPassword(password) {
  const salt = Math.round((new Date().valueOf() * Math.random())) + '';
  const hash = crypto.createHmac('sha1', salt)
    .update(password)
    .digest('hex');
  return hash;
};
