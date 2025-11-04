const express = require('express');
const dotenv = require('dotenv');
const { initDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080; // ⚠️ Render usa su propio puerto

app.use(express.json());
app.use('/contacts', contactsRoutes);

// Ruta base para probar si está viva la API
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Inicializa la conexión y levanta el servidor
initDb((err) => {
  if (err) {
    console.error('❌ Error al conectar con MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Servidor corriendo en el puerto ${port}`);
    });
  }
});
