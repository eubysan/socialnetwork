const express = require('express');
const path = require('path');
const { port } = require('./config');
const { engine } = require('express-handlebars');
// importando rutas
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

const app = express();

// pendiente configurar layout de handelbars

// definir la carpeta publica
app.use(express.static('public'));

//Middleware // Transforma de x-www-form-urlencoded a Object de JS
app.use(express.urlencoded({ extended: true }));

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
