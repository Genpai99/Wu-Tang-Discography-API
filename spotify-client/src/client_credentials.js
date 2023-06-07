var request = require('request');

var client_id = '193031b183824a92b159d8e61fb93432';
var client_secret = '55901794af904a2d98fea86b82ef9abf';
var token_url = 'https://accounts.spotify.com/api/token';

var authOptions = {
  url: token_url,
  headers: {
    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
    // Store the access token for later use
    console.log('Access token:', token);
  }
});
