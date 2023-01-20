const express = require('express')
const router = express.Router()
const {getAllUsers, updateUser, userCount} = require("../controllers/admin")
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")

router.route('/users').get(verifyTokenAndAdmin, getAllUsers)
router.route('/usercount').get(verifyTokenAndAdmin, userCount)
router.route("/user/:id").put(verifyTokenAndAdmin, updateUser)


module.exports = router