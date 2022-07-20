const express = require("express")
const router = express.Router()

const controller = require("../controllers/user.controller")

router.get("/me" , controller.getCurrentUser)
router.patch("/updatePassword"  ,controller.updateUserPassword)
router.patch("/update"  ,controller.updateUser)


module.exports = router ; 