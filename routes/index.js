var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

/* GET home page. */
router.post('/login', AuthController.login);
router.post('/forgotpassword/:email', AuthController.forgotPassword);
router.post('/forgotusername/:email', AuthController.forgotUsername);
router.post('/updatepasswordbylink/:iduser', AuthController.updatePasswordByLink);
router.post('/updateusernamebylink/:iduser', AuthController.updateUsernameByLink);

module.exports = router;
