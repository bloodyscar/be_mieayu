var express = require('express');
var router = express.Router();
const { createCategory } = require('./controller')
const { auth } = require('../../middleware/auth')

router.post('/category', auth, createCategory);

module.exports = router;    
