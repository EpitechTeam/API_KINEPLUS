import express from "express"
let router	= express.Router()
import ensureAuthorized  from './../middlewares/ensureAuthorized'
import test  from './../middlewares/permission'
let user = require('../services/user.service')

router.get('/me', ensureAuthorized, user.me)

router.get('/getId/:email', ensureAuthorized, user.findUserByEmail)

router.get('/disableUser/:email', ensureAuthorized, user.disableUser)

router.get('/activeUser/:email', ensureAuthorized, user.activeUser)

router.post('/changeMDP', ensureAuthorized, user.changeMDP)

router.post('/saveInfo', ensureAuthorized, user.saveUserInformation)

router.post('/saveBilingInfo', ensureAuthorized, user.saveBilingInfo)

router.get('/listUser', test, ensureAuthorized, user.listUser)

module.exports = router
