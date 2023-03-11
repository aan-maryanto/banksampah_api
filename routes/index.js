var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

/* GET home page. */
router.get('', (req, res) =>{
    res.send("Hello World")
})
router.post('/login', AuthController.login);
router.post('/forgotpassword', AuthController.forgotPassword);
router.post('/forgotusername', AuthController.forgotUsername);
router.post('/updatepasswordbylink', AuthController.updatePasswordByLink);
router.post('/register', AuthController.register);
// router.get('/send-email', AuthController.sendEmail);
// router.post('/updateusernamebylink/:iduser', AuthController.updateUsernameByLink);

module.exports = router;
