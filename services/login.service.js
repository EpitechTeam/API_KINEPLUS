let sha256      = require('sha256')
let jwt         = require('jsonwebtoken')
let randomToken = require('random-token')
let ObjectId	= require('mongodb').ObjectID
let fs = require('fs')
let path = require('path')
let User	= require('./../models/User')

let login = async (req, res) => {
  User.findOne({email: req.body.email, password: sha256(req.body.password)}, (err, rep) => {
  if (err || !rep) {
    res.send(400)
  }
  else {
    if (rep.disable == true) {
      res.json({
        type: false,
        data: "Account disable"
      })
    }
    else {
      res.json({
        type: true,
        data: rep
      })
    }
  }
})
}

let logout = async (req, res) => {
  res.json({data: "Logout"})
}

let register = async (req, res) => {
  let string = randomToken(16);
	let token = jwt.sign({id: string}, "shhhhh")
	let password = sha256(req.body.password);
  let try_user = await User.findOne({email : req.body.email})

  if (try_user) {
    res.send(400)
    return
  }

  if (req.body.email.indexOf('@') == -1 || req.body.email.indexOf('.') == -1) {
    res.send(400)
    return;
  }
  if (req.body.password.length < 7) {
    res.send(400)
    return;
  }
  let isKine, isPatient, isAdmin
  if (req.body.role == "isKine") {
    isKine = true
  }
  if (req.body.role == "isPatient") {
    isPatient = true
  }
  if (req.body.role == "isAdmin") {
    isAdmin = true
  }
	var user = new User({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email: req.body.email,
		password : password,
		disable: false,
		token : token,
    isKine : isKine,
    isPatient : isPatient,
    isSuperAdmin : isAdmin,
    canRead : false,
    canWrite : false,
    canUpdate : false
	})

  let newUser = await user.save()
  res.json({
    data: "Register successful",
    user : newUser
  })
}

module.exports = {
	login,
  logout,
  register
}
