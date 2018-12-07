const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Admin-Web'});
});

router.get('/index2', function(req, res, next) {
  console.log('route/index2');
  res.render('index2', {title: 'Admin-Web'});
});

module.exports = router;
