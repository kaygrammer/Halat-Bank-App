const express = require('express')
const router = express.Router()
const {createUser} = require("../controllers/users")
const {login} = require("../controllers/users")

router.route('/signup').post(createUser)
router.route('/login').post(login)

module.exports = router