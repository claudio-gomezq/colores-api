const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('./src/auth/auth');
const jsonToXml = require('./src/middlewares/json-to-xml.middleware');

const {colorRouter, authRouter} = require('./src/routes');
const app = express();

const init = require('./src/db/init')
init().then();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(jsonToXml);

//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', indexRouter);

app.use('/v1/colores', colorRouter);
app.use('/v1/auth', authRouter);

module.exports = app;
