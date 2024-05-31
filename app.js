const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const newsRoutes = require('./routes/newsRoutes');
const newsModel = require('./models/newsModel');
const config = require('./config/config');
const cron = require('node-cron');

const app = express();

app.use(bodyParser.json());
app.use('/api/news', newsRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Función para iniciar el servidor y obtener y almacenar las noticias
const startServer = async () => {
  try {
    await newsModel.fetchAndStoreNews();
    app.listen(config.port, () => {
      console.log(`Servidor en ejecución en http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Error al obtener y almacenar noticias:', error);
  }
};

startServer();

// Programar la tarea para obtener y almacenar noticias cada 3 días
cron.schedule('0 0 */3 * *', async () => {
  try {
    await newsModel.fetchAndStoreNews();
  } catch (error) {
    console.error('Error al obtener y almacenar noticias:', error);
  }
});