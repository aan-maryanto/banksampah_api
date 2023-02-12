const express = require("express")
const router = express.Router()
const checkToken = require("../midlewares/token")
const banksController = require("../controllers/BanksController")

router.get("/", checkToken, banksController.all);
router.post("/add", checkToken, banksController.save);
router.delete("/delete/:id", checkToken, banksController.delete);

module.exports = router