const express = require('express');
const dotenv = require('dotenv');
const { initDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Variable detectada' : '❌ No detectada');

const app = express();
const port = process.env.PORT || 8080; // Render asigna su propio puerto

app.use(express.json());
app.use('/contacts', contactsRoutes);

// Ruta base para probar si la API está viva
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Inicializa la conexión y levanta el servidor
initDb((err) => {
  if (err) {
    console.error('❌ Error al conectar con MongoDB:', err);
    // Levantar el servidor de todas formas
    app.listen(port, () => {
      console.log(`⚠️ Servidor corriendo en puerto ${port} SIN conexión a MongoDB`);
    });
  } else {
    app.listen(port, () => {
      console.log(`✅ Servidor corriendo en puerto ${port} CON conexión a MongoDB`);
    });
  }
});
