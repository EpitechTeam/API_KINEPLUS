import express from "express"
let router	= express.Router()
import ensureAuthorized  from './../middlewares/ensureAuthorized'
import test  from './../middlewares/permission'
let exercice = require('../services/exercice.service')

router.get('/listExerciceUser', ensureAuthorized, exercice.listExerciceUser)

router.get('/listAllExercice', ensureAuthorized, exercice.listAllExercice)

module.exports = router
