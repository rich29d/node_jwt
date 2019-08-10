const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Rotas
const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');

app.use('/', index);
app.use('/login', login);
app.use('/users', users);

module.exports = app;