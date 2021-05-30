var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

/* GET home page. */
router.post('/login', AuthController.login);
router.post('/forgotpassword/:email', AuthController.forgotPassword);

module.exports = router;
