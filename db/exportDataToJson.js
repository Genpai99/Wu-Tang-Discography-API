const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
require('dotenv').config();
const config = require('../config/config.js');
const fs = require('fs');
const WuTangSong = require('/Users/darious/code/Unit-2/Projects/Wu-Tang-Discography/Wu-Tang-Discography-API-Backend/models/wuTangSong.js'); 

const exportDataToJson = async () => {
  try {
    // Fetch all the WuTangSong documents from the database
    const songs = await WuTangSong.find({});

    // Convert the songs array to JSON
    const jsonData = JSON.stringify(songs, null, 2);

    // Save the JSON data to a file
    fs.writeFileSync('wutang_songs.json', jsonData);

    console.log('Data exported to wutang_songs.json successfully.');
  } catch (error) {
    console.error('Error exporting data:', error);
  }
};

// Call the function to export the data to JSON
exportDataToJson();

mongoose
  .connect(config.dbURI, config.options)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });