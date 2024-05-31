const express = require('express');
const newsRoutes = express.Router();
const newsController = require('../controllers/newsController');

newsRoutes.get('/:category', newsController.getNewsByCategory);

module.exports = newsRoutes;