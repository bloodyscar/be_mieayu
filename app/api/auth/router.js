var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/register', function (req, res, next) {
    res.status(200).json({
        message: 'OK'
    })
});

module.exports = router;
