const express = require('express');
const { port } = require('./config');
const { engine } = require('express-handlebars');
// importando rutas
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/index');

const app = express();

// habilitar hbs
app.engine('hbs', engine({ defaultLayout: false }));
app.set('view engine', 'hbs');
// pendiente configurar layout de handelbars

// definir la carpeta publica
app.use(express.static('public'));

//Middleware // Transforma de x-www-form-urlencoded a Object de JS
app.use(express.urlencoded({ extended: true }));

// agregar rutas
app.use(authRouter);
app.use(userRouter);

app.listen(port, function () {
  console.log('Server Running... http://localhost:' + port);
});
