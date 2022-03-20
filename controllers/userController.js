const userModel = require('../models/userModel');

class UserController {
  // Vista home muestra todos los usuarios
  async getUsersView(req, res) {
    let resData;
    if (req.session.loggedIn) {
      const resultado = await userModel.readFilteredUser(req.session.idUser);

      resData = {
        users: resultado.people,
        hasUsers: resultado.people.length > 0,
        friends: resultado.friends,
        hasFriends: resultado.friends.length > 0,
        gender: resultado.people.gender > 0,
        loggedIn: req.session.loggedIn,
      };
    } else {
      resData = {
        loggedIn: false,
      };
      res.redirect('/');
    }

    if (req.session.loggedIn) {
      const friendRequests = await userModel.getFriendRequest(
        req.session.idUser
      );
      resData.friendRequests = friendRequests;
      resData.hasFriendRequests = friendRequests.length > 0;
    }
    console.log(req.session);
    return res.render('home', resData);
  }

  async addFriend(req, res) {
    const idFriend = req.params.idFriend;

    await userModel.addFriend(req.session.idUser, idFriend);

    res.redirect('/home');
  }
}

module.exports = UserController;
