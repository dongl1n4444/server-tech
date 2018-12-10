const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.port || 3000;

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

app.use(logger('dev'));

// bodyParser 对 Post 请求体进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'vendor')));
// app.use('/static', express.static(path.join(__dirname, 'vendor')));
app.use('/', routes);

app.listen(port, function() {
  console.log('app listening on port ' + port.toString());
});
