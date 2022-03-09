const User = require('../models/userModel');

class AuthController {
  getLoginView(req, res) {
    return res.render('auth/login', { layout: 'auth.hbs' });
  }

  getSignupView(req, res) {
    return res.render('auth/signup', { layout: 'auth.hbs' });
  }

  getImboxView(req, res) {
    return res.render('components/imbox');
  }

  getNewPost(req,res){
    return res.render('components/newpost')
  }

  async signUp(req, res) {
    const newUser = new User(req.body);
    const validation = newUser.validate();
    if (validation.success) {
      const userSave = await newUser.create();
      if(userSave.success){
        return res.redirect('/');
      }
      validation.errors.push(userSave.error);
      validation.success = userSave.success;
    }

    return res.render('auth/signup', {
      layout: 'auth.hbs',
      validation,
      user: newUser,
    });
  }
}

module.exports = AuthController;
