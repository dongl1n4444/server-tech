const express = require('express');
const users = require('../controllers/users');
const models = require('../models');

const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('route/');
  res.render('index', {title: 'Admin-Web'});
});

router.get('/index', function(req, res, next) {
  console.log('route/index');
  res.render('index', {title: 'Admin-Web'});
});

router.get('/login', function(req, res, next) {
  console.log('route/login');
  res.render('login', {title: 'Admin-Web'});
});

router.post('/auth/login', function(req, res, next) {
  console.log('route/auth/login ' + typeof(req.body));
  // res.redirect('/index');
  models.User
    .findAll({
      where: {
        email: 'kkk@163.com'
      }
    })
    .then((user) => {
      console.log('succeed find user');
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log('failed to find user');
      res.status(400).send({message: 'Unknown user'});
    });
});

// TEST
router.post('/test/user', function(req, res, next) {
  console.log('route/test/user');
  users.create(req, res);
});

module.exports = router;
