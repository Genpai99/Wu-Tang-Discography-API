const express = require('express');
const router = express.Router();
const songController = require('../controllers/songControllers.js');
const fs = require('fs');
const path = require('path');


// GET /api/songs
router.get('/', songController.getAllSongsFromDB);


// GET /api/songs/:title
router.get('/:title', songController.getSongByTitleFromDB);


// GET /api/songs/:title/lyrics
router.get('/:title/lyrics', songController.getSongLyricsFromDB);

// POST /api/songs
router.post('/songs', songController.createSongInDB);

// PUT /api/songs/:title
router.put('/:title', songController.updateSongInDB);

// DELETE /api/songs/:title
router.delete('/:title', songController.deleteSongFromDB);
  
  

module.exports = router;

