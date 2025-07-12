const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  const filePath = path.resolve(__dirname, '../../visitas.json');
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (event.httpMethod === 'GET') {
    data.contador += 1;
    fs.writeFileSync(filePath, JSON.stringify(data));
    return {
      statusCode: 200,
      body: JSON.stringify({ visitas: data.contador }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  return {
    statusCode: 405,
    body: 'Método no permitido'
  };
};
