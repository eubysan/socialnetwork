const User = require("../models/userModel");

class AuthController {
  getLoginView(req, res){
    return res.render('auth/login');
  }

  getSignupView(req, res){
    return res.render('auth/signup');
  }

  async signUp(req,res){
    const newUser = new User(req.body)
    const validation = newUser.validate()
  
    if(validation.success){
      await newUser.create()
      return res.redirect("/")
    }

    return res.render("auth/signup", {validation, user:newUser})
  }

}

module.exports = AuthController