const express = require('express');
const path = require('path');
const { port, secret } = require('./config');
const { engine } = require('express-handlebars');
const session = require('express-session');

// importando rutas
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const addSessionToTemplate = require('./middleware/addSessionToTemplate');
const app = express();

// definir la carpeta publica
app.use(express.static('public'));

//Middleware // Transforma de x-www-form-urlencoded a Object de JS
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(addSessionToTemplate);

app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'views', 'components'),
    helpers: {
      formatDate: function (date) {
        const newDate = new DateTime(date);
        return newDate.toFormat('yyyy-MM-dd');
      },
    },
  })
);

// habilitar hbs
app.set('view engine', 'hbs');
app.set('views', 'views');

// agregar rutas
app.use(authRouter);
app.use(userRouter);

app.listen(port, function () {
  console.log('Server Running... http://localhost:' + port);
});
