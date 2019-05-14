import express from "express"
let router	= express.Router()
import ensureAuthorized  from './../middlewares/ensureAuthorized'
let login = require('../services/login.service')

router.post('/login', login.login)

router.get('/logout', ensureAuthorized, login.logout)

router.post('/register', login.register)

module.exports = router
