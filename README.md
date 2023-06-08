# Wu-Tang Discography API 

The Wu-Tang Discography API provides information about the albums and songs of the Wu-Tang Clan. It allows users to retrieve album details, song lyrics, and perform CRUD operations on albums and songs.

## Features

- Retrieve a list of albums by the Wu-Tang Clan
- Get detailed information about a specific album
- Retrieve the lyrics for individual songs by title
- Create new albums in the database
- Update existing album information
- Delete albums from the database
- Retrieve a list of songs by the Wu-Tang Clan
- Get detailed information about a specific song
- Retrieve the lyrics for a song by title
- Create new songs in the database
- Update existing song information
- Delete songs from the database

## Technologies Used

- Node.js
- Express.js - Web framework for Node.js
- MongoDB - NoSQL database for storing album and song data
- Mongoose - MongoDB object modeling for Node.js
- Axios - HTTP client for making requests to external APIs (for retrieving song lyrics)

## Getting Started

To set up and run the Wu-Tang Discography API backend, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Set up the environment variables:
   - Create a `.env` file in the root directory
   - Define the following environment variables in the `.env` file:
     - `MONGODB_URI` - URI for connecting to your MongoDB database
     - Other necessary environment variables (e.g., API keys, configuration)
4. Start the server: `npm start`
5. The API will be available at `http://localhost:3000` (or the specified port)

## API Documentation

The API provides the following endpoints:

### Albums

- `GET /api/albums` - Retrieve a list of all albums
- `GET /api/albums/:title` - Retrieve details of a specific album by title
- `POST /api/albums` - Create a new album
- `PUT /api/albums/:title` - Update an existing album by title
- `DELETE /api/albums/:title` - Delete an album by title

### Songs

- `GET /api/songs` - Retrieve a list of all songs
- `GET /api/songs/:title` - Retrieve details of a specific song by title
- `GET /api/songs/:title/lyrics` - Retrieve the lyrics of a song by title
- `POST /api/songs` - Create a new song
- `PUT /api/songs/:title` - Update an existing song by title
- `DELETE /api/songs/:title` - Delete a song by title

Refer to the API documentation for detailed information on request/response formats and available endpoints.

## Error Handling

The API includes error handling for various scenarios. In case of an error, appropriate error messages and status codes are returned to the client.

## Deployment

The API can be deployed to any hosting platform that supports Node.js applications. Some popular options for deployment are Heroku, AWS, and Azure.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
