const express = require('express')
const router = express.Router()
const {createUser, login, getAccountNumber } = require("../controllers/users")
const {verifyTokenAndAuthorization} = require("../middlewares/verifyToken")

router.route('/signup').post(createUser)
router.route('/login').post(login)
router.route('/account/:id').get(verifyTokenAndAuthorization, getAccountNumber)

module.exports = router