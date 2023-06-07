const mongoose = require('mongoose');

const wuTangAlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  total_tracks: {
    type: Number,
    required: true,
  },
  tracks: [
    {
      type: String,
      ref: 'AlbumTrack',
    },
  ],
});

const WuTangAlbum = mongoose.model('WuTangAlbum', wuTangAlbumSchema);

module.exports = WuTangAlbum;

