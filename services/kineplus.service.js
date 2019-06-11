let sha256      = require('sha256')
let jwt         = require('jsonwebtoken')
let randomToken = require('random-token')
let ObjectId	= require('mongodb').ObjectID
let fs = require('fs')
let path = require('path')
let User	= require('./../models/User')

let info = async (req, res) => {
  res.json({data: {
    name : "Kineplus",
    phone : "06 99 88 19 00",
    contact : "contact@gmail.com"
  }})
}

module.exports = {
	info,
}
