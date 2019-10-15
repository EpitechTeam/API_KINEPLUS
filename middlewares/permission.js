let User	= require('./../models/User')

export default async function admin (req, res, next) {
  let user = await User.findOne({token : req.token})

  console.log(user)

  try {
    if (user.isSuperAdmin) {
      next()
    }
    else {
      res.send(401)
    }
  }
  catch (e) {
    res.send(401)
  }
}
