const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const logger = require('morgan');
const models = require('./models');

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

//
// const sequelize = new Sequelize('admin_web', 'root', '123456', {
//   host: 'localhost',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   operatorsAliases: false
// });

// sequelize
//     .authenticate()
//     .then(()=>{
//       console.log('Connection has been established successfully.');
//       app.listen(port, function() {
//         console.log('app listening on port ' + port.toString());
//       });
//     })
//     .catch((err)=>{
//       console.error('Unable to connect to the database:', err);
//     });

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log('app listening on port ' + port.toString());
  });
});
