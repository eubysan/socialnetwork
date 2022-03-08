const User = require("../models/userModel");

class AuthController {
  getLoginView(req, res){
    return res.render('auth/login', {layout: 'auth.hbs'});
  }

  getSignupView(req, res){
    return res.render('auth/signup', {layout: 'auth.hbs'});
  }


  getImboxView(req,res){
    return res.render('components/imbox')
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