let sha256      = require('sha256')
let jwt         = require('jsonwebtoken')
let randomToken = require('random-token')
let ObjectId	= require('mongodb').ObjectID
let fs = require('fs')
let path = require('path')
let User	= require('./../models/User')

let listExerciceUser = async (req, res) => {
  res.json({data: {
    name : "Super exercice",
    last_play : "2019-06-10",
    id : "1234567"
  }})
}

let listAllExercice = async (req, res) => {
  res.json({data: [
    {
      name : "Super exercice",
      last_play : "2019-06-10",
      id : "1234567",
      difficulty : 3,
      image_url : "test.com"
    },
    {
      name : "Super exercice 2",
      last_play : "2019-06-10",
      id : "1234567",
      difficulty : 3,
      image_url : "test.com"
    },
    {
      name : "Super exercice 3",
      last_play : "2019-06-10",
      id : "1234567",
      difficulty : 3,
      image_url : "test.com"
    }
  ]
  })
}

module.exports = {
	listAllExercice,
  listExerciceUser,
}
