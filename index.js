const express = require('express');
const { port } = require('./config');
const { engine } = require('express-handlebars');
const router = require('./routes');

const app = express();

// habilitar hbs
app.engine('hbs', engine({ defaultLayout: false }));
app.set('view engine', 'hbs');

// definir la carpeta publica
app.use(express.static('public'));

// agregar rutas
app.use(router);

app.listen(port, function () {
  console.log('Server Running... http://localhost:' + port);
});
