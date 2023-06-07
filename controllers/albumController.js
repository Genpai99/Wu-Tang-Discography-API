const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
require('dotenv').config();
const config = require('../db/config.js');
const fs = require('fs');
const path = require('path')
const WuTangAlbum = require('../models/wuTangAlbum');

// GET /api/albums
const getAllAlbumsFromDB = async (req, res) => {
  try {
    console.log('Accessing albums route...');
    const albums = await WuTangAlbum.find();
    console.log('Retrieved albums:', albums);
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/albums/:title
const getAlbumByTitleFromDB = async (req, res) => {
  try {
    const album = await WuTangAlbum.findOne({ name: req.params.title });
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// POST /api/albums
const createAlbumInDB = async (req, res) => {
  try {
    const { name, release_date, total_tracks, tracks } = req.body;

    const newAlbum = new WuTangAlbum({
      name,
      release_date,
      total_tracks,
      tracks,
    });

    const savedAlbum = await newAlbum.save();

    res.status(201).json(savedAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update an album by title
const updateAlbumInDB = async (req, res) => {
  console.log('updateAlbumInDB function called');
  try {
    const albumTitle = req.params.title;
    const { releaseDate, totalTracks } = req.body;

    const updatedAlbum = await WuTangAlbum.findOneAndUpdate(
      { name: albumTitle },
      { release_date: releaseDate, total_tracks: totalTracks },
      { new: true }
    );

    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an album by title
const deleteAlbumFromDB = async (req, res) => {
  try {
    const albumTitle = req.params.title;

    const deletedAlbum = await WuTangAlbum.findOneAndDelete({ name: albumTitle });

    if (!deletedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  getAllAlbumsFromDB,
  getAlbumByTitleFromDB,
  createAlbumInDB,
  updateAlbumInDB,
  deleteAlbumFromDB
};

