var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./app/api/auth/router');
var categoryRouter = require('./app/api/category/router');
const URL = '/api/v1'

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoryRouter);

module.exports = app;
