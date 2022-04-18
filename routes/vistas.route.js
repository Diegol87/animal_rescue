const express = require('express')
const router = express.Router()

router.get("/login", (req, res) => res.render("login"))
router.get("/register", (req, res) => res.render("register"))
router.get("/postulation", (req, res) => res.render("postulation"))
router.get("/", (req, res) => res.render("home"))
router.get("/listaAdopcion", (req, res) => res.render("listaAdopcion"))

module.exports = router