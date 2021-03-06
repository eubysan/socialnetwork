const User = require('../models/userModel');

class AuthController {
  getLoginView(req, res) {
    if(req.session.loggedIn){
      return res.redirect('/home')
    }
    return res.render('auth/login', { layout: 'auth.hbs' });
  }

  getSignupView(req, res) {
    if(req.session.loggedIn){
      return res.redirect('/home')
    }
    return res.render('auth/signup', { layout: 'auth.hbs' });
  }

  getImboxView(req, res) {
    return res.render('components/imbox');
  }

  getNewPost(req, res) {
    return res.render('components/newpost');
  }

  logOut(req, res) {
    req.session.destroy();
    return res.redirect('/');
  }

  async logIn(req, res) {
    const credentials = req.body;
    const userData = await User.getByEmail(credentials.email);
    console.log(userData);

    if (userData.length === 0) {
      return res.render('auth/login', {
        layout: 'auth.hbs',
        validation: { errors: ['El usuario no está registrado'] },
      });
    }

    if (userData[0].password !== credentials.password) {
      return res.render('auth/login', {
        layout: 'auth.hbs',
        validation: { errors: ['Credenciales incorrectas'] },
      });
    }
    req.session.loggedIn = true;
    req.session.username = userData[0].username;
    req.session.profilpic = userData[0].profilpic;
    req.session.idUser = userData[0].id;

    return res.redirect('home');
  }

  async signUp(req, res) {
    const newUser = new User(req.body);
    const validation = newUser.validate();
    if (validation.success) {
      const userSave = await newUser.create();
      if (userSave.success) {
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
