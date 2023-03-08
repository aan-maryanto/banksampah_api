var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController')
var checkToken = require('../midlewares/token')
/* GET users listing. */
router.get('/all', UsersController.all);
router.get('/exceptsu', checkToken, UsersController.allexceptsu);
router.get('/byprivilege/:id', checkToken, UsersController.allbyprivilege);
router.get('/byid/:id', checkToken, UsersController.byid);
module.exports = router;
