const newsModel = require('../models/newsModel');

exports.getNewsByCategory = async (req, res, next) => {
  const category = req.params.category;
  try {
    const news = await newsModel.getNewsByCategory(category);
    res.json(news);
  } catch (error) {
    next(error);
  }
};