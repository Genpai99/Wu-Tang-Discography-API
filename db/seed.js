const axios = require('axios');
require('dotenv').config();
const WuTangAlbum = require('../models/wuTangAlbum');
const AlbumTrack = require('/Users/darious/code/Unit-2/Projects/Wu-Tang-Discography/Wu-Tang-Discography-API-Backend/models/albumTrack.js');
const mongoose = require('mongoose');
const config = require('./config');

const seedDatabase = async () => {
  const artistId = '34EP7KEpOjXcM2TCat1ISk';
  const includeGroups = 'album,single';
  const market = 'ES';
  const limit = 50;
  const offset = 0;

  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${includeGroups}&market=${market}&limit=${limit}&offset=${offset}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      }
    });

    if (response.status === 200) {
      const data = response.data;
      console.log(data);

      // Process the data and seed your database
      for (const item of data.items) {
        const wuTangAlbum = await WuTangAlbum.create({
          name: item.name,
          release_date: item.release_date,
          total_tracks: item.total_tracks
        });

        await seedAlbumTracks(item.id, wuTangAlbum);
      }

      console.log('Database seeding completed.');
    } else {
      console.log('Request failed with status:', response.status);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
};

const seedAlbumTracks = async (albumId, wuTangAlbum) => {
  const market = 'ES';
  const limit = 50;
  const offset = 0;

  const albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;
  const tracksUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?market=${market}&limit=${limit}&offset=${offset}`;

  try {
    // Fetch the album details
    const albumResponse = await axios.get(albumUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      }
    });

    if (albumResponse.status === 200) {
      const albumData = albumResponse.data;
      console.log(albumData);

      // Fetch the album tracks
      const tracksResponse = await axios.get(tracksUrl, {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
        }
      });

      if (tracksResponse.status === 200) {
        const tracksData = tracksResponse.data;
        console.log(tracksData);

        // Process the data and seed your album tracks collection
        const albumName = albumData.name; // Get the album name

        for (const item of tracksData.items) {
          await AlbumTrack.create({
            title: item.name,
            album: albumName, // Use the album name instead of album ID
            year: albumData.release_date.substring(0, 4)
          });
        }

        // Update the wuTangAlbum with the track names
        const trackNames = tracksData.items.map(item => item.name);
        await WuTangAlbum.findByIdAndUpdate(wuTangAlbum._id, { tracks: trackNames });

        console.log('Album tracks seeding completed.');
      } else {
        console.log('Request failed with status:', tracksResponse.status);
      }
    } else {
      console.log('Request failed with status:', albumResponse.status);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
};





mongoose
  .connect(config.dbURI, config.options)
  .then(() => {
    console.log('Connected to the database');
    seedDatabase();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
