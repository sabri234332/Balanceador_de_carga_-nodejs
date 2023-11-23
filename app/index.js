const http = require('http');
const mysql = require('mysql2');

const customText = process.env.CUSTOM_TEXT || "Texto predeterminado"; // Obtén la variable de entorno o usa un valor predeterminado

const connection = mysql.createConnection({
  host: 'mysql-container',  // Nombre del contenedor de MySQL
  user: 'root',
  password: '2021',
  database: 'prueba', // Nombre de la base de datos "prueba"
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  connection.query('SELECT * FROM alumnos', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.end('Error al realizar la consulta');
      return;
    }

    const responseText = `${customText}\n\nRegistros:\n${JSON.stringify(results, null, 2)}`;
    res.end(responseText); // Mostrar resultados en formato JSON
  });
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }

  console.log('Conexión exitosa a la base de datos MySQL');

  server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
});
