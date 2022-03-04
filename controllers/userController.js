const userModel = require('../models/userModel');

class UserController {
  // Vista home muestra todos los usuarios
  async viewHomeUsers(req, res) {
    const users = await userModel.readAll();
    console.log(users);
    return res.render('home', {
      username: 'Euby',
      users,
      hasUser: users.lenght > 0,
    });
  }
}

module.exports = UserController;
