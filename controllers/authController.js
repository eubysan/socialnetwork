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

  async logIn(req, res){
    const credentials = req.body;
    console.log(credentials)
    const userData = await User.getByEmail(credentials.email)
    if(userData.lenght === 0){
      return res.render('auth/login', {validation:{
        errors:['El usuario no está registrado']
      }})
    }

    if(userData[0].password!==credentials.password){
      return res.render('auth/login',{validation:{
        errors:['Credenciales incorrectas']
      }})
    }
    req.session.loggedIn = true
    return res.redirect('components/home')
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
