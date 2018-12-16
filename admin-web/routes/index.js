const express = require('express');
// const users = require('../controllers/users');
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

  models.User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    // console.log('findOne then: ' + user);
    if (!user) {
      res.redirect('/login');
    } else if (!user.validPassword(password)) {
      res.redirect('/login');
    } else {
      req.session.user = user.dataValues;
      // req.session.save();
      res.redirect('/index');
    }
  }).catch((error) => {
    console.log('faild to find user: ' + error);
    res.redirect('/login');
  });
});

router.get('/logout', function(req, res) {
  console.log('/log');
});

router.get('/signup', function(req, res) {
  res.render('signup', {title: 'Admin-Web'});
});
router.post('/signup', function(req, res) {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    salt: ''
  }).then((user) => {
    req.session.user = user.dataValues;
    res.redirect('/index');
  }).catch((error) => {
    console.log('failed to signup: ' + error);
    res.redirect('/signup');
  });
});

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

module.exports = router;
