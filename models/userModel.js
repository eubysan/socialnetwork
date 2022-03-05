const { query, insert } = require('../config/database');

class User {
  idUser;
  constructor(user) {
    this.username = user.username;
    this.name = user.name;
    this.birthday = user.birthday;
    this.gender = user.gender;
    this.email = user.email;
    this.password = user.password;
    this.profilpic = user.profilpic;
    this.passwordRepeat = user.passwordRepeat;
  }

  //se puede utilizar el metodo sin crear una instancia
  async create() {
    const newUser = await insert('users', {
      username: this.username,
      name: this.name,
      birthday: this.birthday,
      gender: this.gender,
      email: this.email,
      password: this.password,
      profilpic: this.profilpic,
    });
    this.idUser = newUser;
  }
  static async readAll() {
    const users = await query('SELECT * FROM users');
    return users;
  }
  async readOne(id) {
    const user = await query('SELECT * FROM user WHERE id=' + id + ' LIMIT 1');
    return user;
  }
  async updateOne(newUser) {
    const user = await query('UPDATE user SET ? WHERE id=?', [
      newUser,
      this.idUser,
    ]);
  }
  async delete() {
    const user = await del('users', this.idUser);
  }

  validate(){
    let result = {success: true, errors:[]}
    if(!(this.name && this.username && this.email && this.password && this.passwordRepeat)){
      result.success = false,
      result.errors.push('Rellene los campos')
    }

    if(this.password !== this.passwordRepeat){
      result.success = false,
      result.errors.push('Las contraseña no coinciden')
    }

    return result;
  }
}

module.exports = User;
