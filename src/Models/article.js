const mongoose = require("mongoose");

const ArticleScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Article = mongoose.model("Article", ArticleScheme);
module.exports = Article;
