const mysql = require('mysql2/promise');
const config = require('../config/config');

const createConnection = async () => {
  const connection = await mysql.createConnection(config.database);
  console.log('Conexión a la base de datos establecida');

  connection.on('error', (err) => {
    console.error('Error de conexión a la base de datos:', err);
  });

  const deleteOldNews = async () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const sql = 'DELETE FROM articles WHERE published_at < ?';
    const [results] = await connection.execute(sql, [threeDaysAgo]);
    console.log(`Eliminados ${results.affectedRows} registros antiguos.`);
  };

  const storeNews = async (category, articles) => {
    const values = articles.map(article => [
      category,
      article.source.name,
      article.author,
      article.title,
      article.description,
      article.url,
      article.urlToImage,
      new Date(article.publishedAt),
      article.content
    ]);
  
    const sql = 'INSERT INTO articles (category, source_name, author, title, description, url, url_to_image, published_at, content) VALUES ?';
    const [results] = await connection.query(sql, [values]);
    console.log(`Insertados ${results.affectedRows} artículos en la categoría ${category}.`);
  };

  const getNewsByCategory = async (category) => {
    let sql = 'SELECT * FROM articles WHERE category = ?';
    if (category === 'all') {
      sql = 'SELECT * FROM articles';
    }
    const [results] = await connection.execute(sql, category === 'all' ? null : [category]);
    return results;
  };

  return {
    storeNews,
    getNewsByCategory,
    deleteOldNews
  };
};

const init = async () => {
  const db = await createConnection();
  return db;
};

module.exports = init;