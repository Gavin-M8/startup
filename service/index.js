const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// list of users
let users = [];

// set backend port to 4000
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// set up express
app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// endpoints
