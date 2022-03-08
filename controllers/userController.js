const userModel = require('../models/userModel');

class UserController {
  // Vista home muestra todos los usuarios
  async viewHomeUsers(req, res) {
    const users = await userModel.readAll();
    return res.render('home', {
      username: 'Euby',
      users: users,
      hasUsers: users.length > 0,
      gender: users.gender > 0,
    });
  }
}

module.exports = UserController;
