const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
