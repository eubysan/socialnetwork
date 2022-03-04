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

module.exports = { login, signup };
