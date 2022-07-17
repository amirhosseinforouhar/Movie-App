const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000,
  },
  cover: {
    type: String,
    required : true 
  },

  likeCount: { type: Number, default: 0 },
  
  likes: [mongoose.Types.ObjectId],
  actors: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  adult: {
    type: Boolean,
    required: true,
  }
} , {timestamps : true});

const Movie = mongoose.model("movies", movieSchema);
module.exports = Movie;
