const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const checkToken = (req, res, next) => {
    console.log("Header"+req.get('Authorization'))
    if(!req.get('Authorization')) {
        return res.send({"message":"Token is required"})
    }
    if(!req.get('Authorization').startsWith("Bearer")) {
        return res.send({"message": "invalid token"})
    }
    const token = req.get('Authorization').split(" ")[1]
    console.log(token)
    jwt.verify(token, process.env.SALT, (err, decoded) => {
        if(err) {
            return res.send(err)
        }
        if(decoded['exp'] < (Date.now() / 1000)) {
            next()
        }
        next()
    })
}

module.exports = checkToken