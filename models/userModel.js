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
      profilpic: 'img/avatar/user.svg',
    });
    this.idUser = newUser;

    return newUser;
  }

  // Datos del usuario al iniciar sesion
  static async getFriendRequest(idUser) {
    return await query(
      'SELECT username, name, profilpic FROM friends JOIN users ON users.id=friends.idMe WHERE idFriend = ? AND status=0',
      [idUser]
    );
  }

  static async getByEmail(email) {
    const data = await query('SELECT * FROM users WHERE email=?', [email]);
    return data;
  }

  static async readAll() {
    const users = await query('SELECT * FROM users');
    return users;
  }

  //Hacer un filtro de los usuarios para retirar a nosotros
  static async readFilteredUser(idUser) {
    // consulta de personas registradas
    const people = await query(
      'SELECT * FROM users WHERE id <> ? AND id NOT IN (SELECT users.id FROM users JOIN friends ON users.id=friends.idFriend WHERE friends.idMe=?) ORDER BY RAND()',
      [idUser, idUser]
    );
    // consulta de amigos agregados
    const friends = await query(
      'SELECT * FROM users JOIN friends ON users.id=friends.idFriend WHERE friends.idMe = ?',
      [idUser]
    );
    // vista de 3 personas registradas
    const people3 = await query(
      'SELECT * FROM users WHERE id <> ? ORDER BY RAND() LIMIT 3',
      [idUser]
    );
    console.log(friends);
    return { people, friends, people3 };
  }

  // agregar amigos
  static async addFriend(idMe, idFriend) {
    return await query('INSERT INTO friends(idMe,idFriend) VALUES(?,?)', [
      idMe,
      idFriend,
    ]);
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

  validate() {
    let result = { success: true, errors: [] };

    if (
      !(
        this.name &&
        this.username &&
        this.email &&
        this.password &&
        this.passwordRepeat
      )
    ) {
      result.success = false;
      result.errors.push('Por favor, rellene todos los campos');
    }

    if (this.password !== this.passwordRepeat) {
      (result.success = false), result.errors.push('La contraseña no coincide');
    }
    return result;
  }
}

module.exports = User;
