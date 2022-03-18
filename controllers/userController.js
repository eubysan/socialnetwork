const userModel = require('../models/userModel');

class UserController {
  // Vista home muestra todos los usuarios
  async getUsersView(req, res) {
    const users = await userModel.readAll();
    const usersReg = await userModel.readThree(req.session.id);

    let resData = {
      usersReg: usersReg,
      users: users,
      hasUsers: users.length > 0,
      gender: users.gender > 0,
      loggedIn: req.session.loggedIn
    };

    if (req.session.loggedIn) {
      const friendRequests = await userModel.getFriendRequest(req.session.id);
      resData.friendRequests = friendRequests;
      resData.hasFriendRequests = friendRequests.length > 0;
    }

    return res.render('home', resData);
  }
}

module.exports = UserController;
