const express = require("express");
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar sesión
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, '/public')));




// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Cambia si es necesario
  password: '',  // Cambia si es necesario
  database: 'inventario'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { nombre, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (isMatch) {
          req.session.usuario = nombre;
          res.redirect('/inventario');
        } else {
          res.send('Contraseña incorrecta');
        }
      });
    } else {
      res.send('Usuario no encontrado');
    }
  });
});

app.get('/inventario', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/inventario.html');
});

app.post('/inventario', (req, res) => {
  const { marca, cantidad, descripcion, tipo_parte, fecha_entrega, fecha_recibida } = req.body;
  const query = 'INSERT INTO inventario (marca, cantidad, descripcion, tipo_parte, fecha_entrega, fecha_recibida) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [marca, cantidad, descripcion, tipo_parte, fecha_entrega, fecha_recibida], (err, results) => {
    if (err) throw err;
    res.send('Inventario agregado correctamente');
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
