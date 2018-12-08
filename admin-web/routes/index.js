const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('route/');
  res.render('index', {title: 'Admin-Web'});
});

router.get('/index', function(req, res, next) {
  console.log('route/index');
  res.render('index', {title: 'Admin-Web'});
});

module.exports = router;
