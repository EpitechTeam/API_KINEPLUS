import express from "express"
let router	= express.Router()
import ensureAuthorized  from './../middlewares/ensureAuthorized'
import test  from './../middlewares/permission'
let kineplus = require('../services/kineplus.service')

router.get('/kineplusInfo', ensureAuthorized, kineplus.info)

module.exports = router
