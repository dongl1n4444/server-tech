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
    ],
    hooks: {
      beforeCreate: (user, options) => {
        console.log('before hashPassword: ' + user.password);
        user.salt = makeSalt();
        user.password = hashPassword(user.password, user.salt);
        console.log('after hashPassword: ' + user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  // User.beforeCreate((user, options) => {
  //   console.log('before hashPassword: ' + user.password);
  //   user.salt = makeSalt();
  //   user.password = hashPassword(user.password, user.salt);
  //   console.log('after hashPassword: ' + user.password);
  // });
  User.prototype.validPassword = function(password) {
    console.log('validPassword: ' + this.salt + '-' + this.password);
    const hashPW = hashPassword(password, this.salt);
    return hashPW === this.password;
  };
  return User;
};

function makeSalt() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
};

function hashPassword(password, salt) {
  const hash = crypto.createHmac('sha1', salt).update(password).digest('hex');
  return hash;
};
