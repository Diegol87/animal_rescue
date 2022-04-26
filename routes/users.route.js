const express = require('express')
const expressFileUpload = require('express-fileupload')
const { createUser, loginUser, getUser, editUser, createAnimal, getAnimals } = require('../controllers/user.controller')
const { requireAuth } = require('../middlewares/requireAuth')
const { requireLogin, requireDatabase, requireDatabaseanimals } = require('../middlewares/requireDatabase')

const router = express.Router()

router.use(expressFileUpload({
    abortOnLimit: true
}))

router.post("/users", requireDatabase, createUser)
router.post("/login", requireLogin, loginUser)
router.get("/user", requireAuth, getUser)
router.put("/user/:id", editUser)
router.post("/animal", requireDatabaseanimals, createAnimal)
router.get("/animals", requireAuth, getAnimals)

module.exports = router