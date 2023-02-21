const express = require("express")
const router = express.Router()
const checkToken = require("../midlewares/token")
const profileController = require("../controllers/ProfileController")

router.get("/getProfile", checkToken, profileController.getStatusProfile)
router.post("/updateProfile", checkToken, profileController.updateProfile)

module.exports = router
