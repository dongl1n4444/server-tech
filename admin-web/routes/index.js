const express = require('express');
const users = require('../controllers/users');
const models = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  console.log('/ sessionID:' + req.sessionID);
  res.render('index', {title: 'Admin-Web'});
});

router.get('/index', isLoggedIn, function(req, res) {
  console.log('route/index');
  res.render('index', {title: 'Admin-Web'});
});

router.get('/login', function(req, res) {
  console.log('route/login');
  res.render('login', {title: 'Admin-Web'});
});

router.post('/login', function(req, res) {
  // console.log('route/auth/login ' + typeof(req.body));
  // res.redirect('/index');
  const email = req.body.email;
  const password = req.body.password;

  models.User
    .findAll({
      where: {
        email: email
      }
    })
    .then((user) => {
      if (!user) {
        console.log('no user');
        res.redirect('/login');
      } else if (!user.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        res.redirect('/index');
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get('/logout', function(req, res) {
  console.log('/log');
});

router.get('/signup', function(req, res) {
});

function isLoggedIn(req, res, next) {
  // if (req.)
  res.redirect('/login');
};

module.exports = router;
