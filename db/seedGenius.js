const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
require('dotenv').config();
const WuTangSong = require('/Users/darious/code/Unit-2/Projects/Wu-Tang-Discography/Wu-Tang-Discography-API-Backend/models/wuTangSong.js');
const config = require('./config.js'); // Replace './config' with the correct path to your configuration file

const fetchWuTangSongs = async () => {
  const artistId = '21'; // Wu-Tang Clan's Genius artist ID
  const perPage = 20;
  let page = 1;
  let allSongs = [];

  try {
    while (true) {
      const url = `https://api.genius.com/artists/${artistId}/songs?page=${page}&per_page=${perPage}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        const songs = data.response.songs;

        if (songs.length === 0) {
          // No more songs available
          break;
        }

        allSongs = allSongs.concat(songs);

        page++;
      } else {
        console.log('Request failed with status:', response.status);
        break;
      }
    }

    console.log('Total songs:', allSongs.length);

    // Process the songs and fetch the lyrics
    for (const song of allSongs) {
      const title = song.title;
      const url = song.url;

      const lyrics = await fetchLyricsFromURL(url);

      // Create and save the WuTangSong model
      await WuTangSong.create({
        title: title,
        url: url,
        lyrics: lyrics
      });

      console.log('Song seeded:', title);
    }

    console.log('All songs seeded successfully.');
  } catch (error) {
    console.log('Error:', error.message);
  }
};


const fetchLyricsFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
  
        // Find the container element that contains the lyrics
        const lyricsContainer = $('#lyrics-root');
  
        // Try different approaches to extract the lyrics
  
        // Approach 1: Check for a specific element by ID
        let lyrics = lyricsContainer.find('#lyrics').text().trim();
  
        // Approach 2: Check for a specific element by class
        if (!lyrics) {
          lyrics = lyricsContainer.find('.lyrics').text().trim();
        }
  
        // Approach 3: Look for patterns in the HTML structure
        if (!lyrics) {
          lyricsContainer.find('br').replaceWith('\n'); // Replace <br> tags with line breaks
          lyrics = lyricsContainer.text().trim();
        }
  
        return lyrics;
      } else {
        console.log('Failed to fetch song URL:', url);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  
    return null;
  };
  

// Call the function to fetch and seed Wu-Tang Clan songs
fetchWuTangSongs();

mongoose
  .connect(config.dbURI, config.options)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
