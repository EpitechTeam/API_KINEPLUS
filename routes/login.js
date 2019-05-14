import express from "express"
let router	= express.Router()
import ensureAuthorized  from './../middlewares/ensureAuthorized'
let login = require('../services/login.service')

router.get('/login', login.login)

router.get('/logout', login.logout)

router.post('/register', login.register)

module.exports = router
