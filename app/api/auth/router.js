var express = require('express');
var router = express.Router();
const { createUser, login } = require('./controller')

/* GET home page. */
router.post('/register',  createUser);
router.post('/login', login);

module.exports = router;
