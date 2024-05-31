const axios = require('axios');
const config = require('../config/config');
const initDB = require('../utils/database'); // Importa la función init

const fetchAndStoreNews = async () => {
  const categories = ['business', 'politics', 'entertainment', 'health', 'science', 'sports', 'technology'];

  try {
    const db = await initDB(); // Llama a la función init y espera a que se resuelva la promesa
    await db.deleteOldNews(); // Ahora puedes acceder a las funciones del objeto devuelto por init

    for (const category of categories) {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${config.newsApiKey}`);
      const articles = response.data.articles;
      console.log(response);
      await db.storeNews(category, articles); // Usa db.storeNews
    }
  } catch (error) {
    console.error('Error al obtener y almacenar noticias:', error);
  }
};

const getNewsByCategory = async (category) => {
  try {
    const db = await initDB(); // Llama a la función init y espera a que se resuelva la promesa
    const news = await db.getNewsByCategory(category); // Usa db.getNewsByCategory
    return news;
  } catch (error) {
    throw new Error(`Error al obtener noticias por categoría: ${error.message}`);
  }
};

module.exports = {
  fetchAndStoreNews,
  getNewsByCategory
};