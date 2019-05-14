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
    res.json({
      type: false,
      data: "No user found"
    })
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

	var user = new User({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email: req.body.email,
		password : password,
		disable: false,
		token : token
	})

  let newUser = await user.save()
  res.json({
    data: "Register successful"
  })
}

module.exports = {
	login,
  logout,
  register
}
