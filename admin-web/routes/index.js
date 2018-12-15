const express = require('express');
const users = require('../controllers/users');
const models = require('../models');

const router = express.Router();

router.get('/', function(req, res) {
  console.log('/ sessionID:' + req.sessionID);
  res.render('index', {title: 'Admin-Web'});
});

router.get('/index', function(req, res) {
  console.log('route/index');
  res.render('index', {title: 'Admin-Web'});
});

router.get('/login', function(req, res) {
  console.log('route/login');
  res.render('login', {title: 'Admin-Web'});
});

router.post('/signin', function(req, res) {
  // console.log('route/auth/login ' + typeof(req.body));
  // res.redirect('/index');
  models.User
    .findAll({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user.length === 0) {
        console.log('no user');
        res.status(400).send({message: 'Unknown user'});
      } else {
        if (user.password === req.body.password) {
          console.log('Succeed find user');
          res.redirect('/index');
        } else {
          console.log('password fail');
          res.status(400).send({message: 'password fail'});
        }
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get('/logout', function(req, res) {
  console.log('/log');
});

// TEST
router.post('/test/user', function(req, res) {
  console.log('route/test/user');
  users.create(req, res);
});

module.exports = router;
