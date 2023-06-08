const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const WuTangSong = require('./models/wuTangSong');
require('dotenv').config();
const cors = require('cors');


const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wutang';


mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(async() => {
    const collectionName = mongoose.connection.db.collection('wutangsongs').collectionName;
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const songsRouter = require('./routes/songs');
app.use('/api/songs', songsRouter);


const albumsRouter = require('./routes/albums');
app.use('/api/albums', albumsRouter);  

app.use('/api', songsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});