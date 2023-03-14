var express = require('express')
var router = express.Router();
var dotenv = require('dotenv')
var checkToken = require('../midlewares/token')
var PrivilegeController = require('../controllers/PrivilegeController');

dotenv.config()

router.get('/all', PrivilegeController.all)
// router.get('/byid/:idprivilege', checkToken, PrivilegeController.byid)
router.post('/add', PrivilegeController.save)
router.delete('/delete/:idprivilege', PrivilegeController.delete)

module.exports = router