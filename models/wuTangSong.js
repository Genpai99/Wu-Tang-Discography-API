const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const config = require('../db/config.js');
const fs = require('fs');


const wuTangSongSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  lyrics: {
    type: String,
  },
},
);



const WuTangSong = mongoose.model('wutangsongs', wuTangSongSchema);

module.exports = WuTangSong;
