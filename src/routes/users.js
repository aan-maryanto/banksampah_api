var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController')
var checkToken = require('../midlewares/token')
/* GET users listing. */
router.get('/all', UsersController.all);
router.get('/exceptsu', UsersController.allexceptsu);
router.get('/byprivilege/:id', UsersController.allbyprivilege);
router.get('/byid/:id', UsersController.byid);
router.post('/update-profile/:id', UsersController.addProfile);
module.exports = router;
