const mongoose = require('mongoose');
const { dbURI, options } = require('./config');

// mongoose.connect(process.env, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database.');
});
