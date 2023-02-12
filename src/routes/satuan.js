const express = require("express")
const router = express.Router()
const checkToken = require("../midlewares/token")
const satuanController = require("../controllers/SatuanController")

router.get("/", satuanController.all)
router.post("/add", satuanController.save)
router.delete("/delete", satuanController.delete)

module.exports = router