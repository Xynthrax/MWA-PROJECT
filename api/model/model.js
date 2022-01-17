const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: String,
});

const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    songs: [songSchema],
  },
});

mongoose.model(process.env.DB_ALBUMS_MODEL, albumSchema);

// module.exports = Album;
