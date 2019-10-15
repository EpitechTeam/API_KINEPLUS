let ObjectId	= require('mongodb').ObjectID
let fs = require('fs')
let path	= require('path')
let User	= require('./../models/User')
let sha256      = require('sha256')

let changeMDP = async (req, res) => {
	User.findOne({token : req.token, password: sha256(req.body.password)}, (err, rep) => {
		if (err || !rep) {
			res.send(400)
		}
		else {
			let newpassord = req.body.new_password
			let hashpassword = sha256(newpassord);

			let newValues = { $set : {
				password : hashpassword
			}}

			User.updateOne({token: req.token}, newValues, (err, rep) => {
				if (err || !rep) {
					res.json({
						type: false,
						data: "Can't update new password"
					})
				}
				else {
					res.json({
						type: true,
						data: "User correctly change password"
					})
				}
			})

		}
	})

}

let me = (req, res) => {
    User.findOne({token: req.token}, (err, user) => {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: user
            })
        }
    })
}

let findUserByEmail = (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if (err) throw err
        res.json({
            type: true,
            data: user
        })
    })
}

let saveUserInformation = (req, res) => {
	let newValues = { $set : {
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
	} }
	User.updateOne({"token" : req.token}, newValues, (err, rep) => {
		if (err || !rep) {
			res.json({
				type: false,
				data: "Can't find this user"
			})
		}
		else {
			User.findOne({"token": req.token}, (err, user) => {
				res.json({
					type: true,
					data: user
				})
			})
		}
	})
}

let saveBilingInfo = async (req, res) => {
	let user = await User.findOne({token : req.token})


	let new_biling_info = {
		company_name : req.body.company_name,
		address_1 : req.body.address_1,
		address_2 : req.body.address_2,
		city : req.body.city,
		state : req.body.state,
		zip_code : req.body.zip_code,
		phone : req.body.phone,
		email : req.body.email
	}

	let newValues = { $set : {
		biling_info : new_biling_info
	}}

	await User.updateOne({token: req.token}, newValues)

	res.json({
		type: true,
		data: "Biling info saved"
	})
}

let listUser = (req, res) => {
	User.find({}, (err, rep) => {
		if (err || !rep) {
			res.json({
				type: false,
				data: "No user"
			})
		}
		else {
			res.json({
				type: true,
				data: rep
			})
		}
	})
}

let right = async (req, res) => {
	let user = await User.findOne({token : req.body.toToken})
  
	let new_user = { $set: {
		canRead : req.body.canRead,
		canWrite : req.body.canWrite,
		canUpdate : req.body.canUpdate
		}
	}
  
	await User.updateOne({token : req.body.toToken}, new_user)

	res.json({
		"message" : "done"
	})
}

let disableUser = (req, res) => {
	User.findOne({"email" : req.params.email}, (err, rep) => {
		if (err || !rep) {
			res.json({
				type: false,
				data: "Can't find this user"
			})
		}
		else {
			let newValues = { $set: {
				disable: true
			}}
			User.updateOne({"email" : req.params.email}, newValues, (err, rep) => {
				if (err || !rep) {
					res.json({
						type: false,
						data: "Can't disable this account"
					})
				}
				else {
					res.json({
						type: true,
						data: "This user is now disable"
					})
				}
			})
		}
	})
}

let activeUser = (req, res) => {
	User.findOne({"email" : req.params.email}, (err, rep) => {
		if (err || !rep) {
			res.json({
				type: false,
				data: "Can't find this user"
			})
		}
		else {
			let newValues = { $set: {
				disable: false
			}}
			User.updateOne({"email" : req.params.email}, newValues, (err, rep) => {
				if (err || !rep) {
					res.json({
						type: false,
						data: "Can't active this account"
					})
				}
				else {
					res.json({
						type: true,
						data: "This user is now active"
					})
				}
			})
		}
	})
}

module.exports = {
	saveUserInformation,
	findUserByEmail,
	me,
	right,
	disableUser,
	activeUser,
	listUser,
	saveBilingInfo,
	changeMDP
}
