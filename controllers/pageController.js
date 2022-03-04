const login = (req, res) => {
  res.render('auth/login', {
    page: 'Login',
  });
};
const signup = (req, res) => {
  res.render('auth/signup', {
    page: 'Signup',
  });
};
const pageHome = (req, res) => {
  res.render('home', {
    page: 'Home',
  });
};

module.exports = { pageHome, login, signup };
