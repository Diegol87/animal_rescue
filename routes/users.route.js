const express = require('express')
const expressFileUpload = require('express-fileupload')
const { createUser, loginUser } = require('../controllers/user.controller')
const { requireLogin, requireDatabase } = require('../middlewares/requireDatabase')

const router = express.Router()

router.use(expressFileUpload({
    abortOnLimit: true
}))

router.post("/users", requireDatabase, createUser)
router.post("/login", requireLogin, loginUser)

module.exports = router