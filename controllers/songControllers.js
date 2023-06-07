const WuTangSong = require('../models/wuTangSong.js');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
require('dotenv').config();
const config = require('../db/config.js');
const fs = require('fs');
const path = require('path');


// GET /api/songs - Retrieve all songs from the MongoDB database
const getAllSongsFromDB = async (req, res) => {
  try {
    const songs = await WuTangSong.find({});
      res.json(songs);  
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// GET /api/songs/:title - Retrieve a specific song by its title from the MongoDB database
const getSongByTitleFromDB = async (req, res) => {
  try {
    const title = req.params.title;
    const song = await WuTangSong.findOne({ title });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json({ song });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// GET /api/songs/:title/lyrics - Retrieve the lyrics of a specific song by its title from the MongoDB database
const getSongLyricsFromDB = async (req, res) => {
  try {
    const title = req.params.title;
    const song = await WuTangSong.findOne({ title });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    const lyrics = song.lyrics;
    res.json({ lyrics });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/songs - Create a new song in the MongoDB database
const createSongInDB = async (req, res) => {
  try {
    console.log('Creating new song:', req.body);
    const newSong = new WuTangSong(req.body);
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /api/songs/:title - Update a specific song by its title in the MongoDB database
const updateSongInDB = async (req, res) => {
  try {
    const songTitle = req.params.title;
    const updatedSong = await WuTangSong.findOneAndUpdate(
      { title: songTitle },
      req.body,
      { new: true }
    );
    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(updatedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// DELETE /api/songs/:title - Delete a specific song by its title from the MongoDB database
const deleteSongFromDB = async (req, res) => {
  try {
    const title = req.params.title;
    const deletedSong = await WuTangSong.findOneAndDelete({ title });
    if (!deletedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllSongsFromDB,
  getSongByTitleFromDB,
  getSongLyricsFromDB,
  createSongInDB,
  updateSongInDB,
  deleteSongFromDB,
};
