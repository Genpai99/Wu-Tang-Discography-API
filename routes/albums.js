// routes/albums.js

const express = require('express');
const router = express.Router();

// Import the album controller
const albumController = require('../controllers/albumController');

// Define routes for CRUD operations on albums
router.get('/', albumController.getAllAlbumsFromDB);
router.get('/:title', albumController.getAlbumByTitleFromDB);
router.post('/', albumController.createAlbumInDB);
router.put('/:title', albumController.updateAlbumInDB);
router.delete('/:title', albumController.deleteAlbumFromDB);

module.exports = router;
