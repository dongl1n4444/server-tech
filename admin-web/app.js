const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const logger = require('morgan');
const models = require('./models');
// const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
const session = require('express-session');
const uuid = require('uuid/v4');

const env = process.env.NODE_ENV || 'development';
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

// app.use(cookieParser());
// app.use(cookieSession({secret: 'secret'}));
app.use(session({
  genid: function(req) {
    return uuid();
  },
  secret: 'recommand 128 bytes random string',
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60 * 1000
  }
}));

app.use('/', routes);

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log('app listening on port ' + port.toString());
  });
});
