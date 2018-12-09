const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

// bodyParser 对 Post 请求体进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'vendor')));
// app.use('/static', express.static(path.join(__dirname, 'vendor')));
app.use('/', routes);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
