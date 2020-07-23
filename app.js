const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {coloresRouter} = require('./src/routes');

const app = express();

const init = require('./src/db/init')
init().then();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', indexRouter);

app.use('/colores', coloresRouter);

module.exports = app;
