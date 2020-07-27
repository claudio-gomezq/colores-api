const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('./src/auth/auth');
const jsonToXml = require('./src/middlewares/json-to-xml.middleware');

const {colorRouter, authRouter, docsRouter} = require('./src/routes');
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

app.get('/', (req, res) => {
    res.redirect('/v1/docs');
});

app.use('/v1/colores', colorRouter);
app.use('/v1/auth', authRouter);
app.use('/v1', docsRouter);


//Global error handler
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    res.status(500).json({message: '500: Internal server error'});
});

module.exports = app;
