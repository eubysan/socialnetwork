const login = (req, res) => {
  res.render('auth/login', {
    page: 'Login',
  });
};
const register = (req, res) => {
  res.render('auth/register', {
    page: 'Register',
  });
};
const pageHome = (req, res) => {
  res.render('home', {
    page: 'Home',
  });
};

module.exports = { pageHome, login, register };
