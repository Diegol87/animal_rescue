const express = require('express')
const expressFileUpload = require('express-fileupload')
const { createUser, loginUser, getUser, editUser, createAnimal, getAnimals, deleteAnimal } = require('../controllers/user.controller')
const { requireAuth } = require('../middlewares/requireAuth')
const { requireAdmin } = require('../middlewares/requireAdmin')
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
router.get("/animals", getAnimals)
router.delete("/animal/:id", deleteAnimal)

module.exports = router