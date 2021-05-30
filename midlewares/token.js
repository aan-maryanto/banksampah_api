const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const checkToken = (req, res, next) => {
    console.log("Header"+req.get('token'))
    if(!req.get('token')) {
        res.send({"message":"Token is required"})
    }
    jwt.verify(req.get('token'), process.env.SALT, (err, decoded) => {
        if(err) {
            res.send(err)
        }
    })
}

module.exports = checkToken