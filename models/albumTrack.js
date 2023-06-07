const mongoose = require('mongoose');

const albumTrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    ref: 'WuTangAlbum',
    required: true,
  },
  year: {
    type: Number,
  },
});

const AlbumTrack = mongoose.model('AlbumTrack', albumTrackSchema);

module.exports = AlbumTrack;


