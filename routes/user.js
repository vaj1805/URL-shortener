const express = require('express')
const {handleUserSignUp , handleUserLogin} = require('../controllers/user')

const router = express.Router();

//login
router.post("/login" , handleUserLogin)
//signup route
router.post("/" , handleUserSignUp)

module.exports = router;