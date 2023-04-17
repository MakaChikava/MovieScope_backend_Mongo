const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
title: String,
descripton: String,
poster: String,
genre: String,
type: String,
duration: String,
release_date: String
})

const Movies = mongoose.model('Movies', movieListSchema)
module.exports = Movies;