const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3001;

// Configure CORS para permitir solicitudes desde todos los orígenes
// ya que react hace una solicitud al servidor Express, el navegador 
//verifica si el servidor permite que el dominio de origen (React) 
//acceda a sus recursos. Si no se establece el encabezado 
//Access-Control-Allow-Origin, el navegador bloqueará la solicitud 
//debido a la política de CORS.
app.use(cors());

// me conecto a mi base de datos de mysql para traer los productos
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fede2101',
  database: 'walkingbread'
});

module.exports = connection;

// MUESTRO SI LA CONEXION FUE EXTIOSA O NO
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

// EJECUTO LA FUNCION CUANDO HAGO LA SOLICITUD GET A LA RUTA PRODUCTS
// HAGO LA CONSULTA A LA BASE DE DATOS Y MANEJO ERRORES Y RESPUESTAS.
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      console.log('Productos obtenidos:', results);
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
