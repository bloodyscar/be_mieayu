const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        try {
            const header = req.headers['authorization'];
            const decoded = header.split(' ')[1]
            const verify = jwt.verify(decoded, 'secret');
            console.log(req.user)
            if (verify) {
                req.user = verify.user;
                next();
            }
        } catch (error) {
            res.status(401).json({
                status: 'FAILED',
                message: 'INVALID TOKEN'
            })

        }
    }
}