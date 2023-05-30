Project Proposal
Project Goal and Purpose
The goal of this project is to create an API that catalogs the entire discography of the Wu-Tang Clan, a legendary hip-hop group. The API will provide information about each song, including the song name and lyrics. Users will be able to retrieve, create, update, and delete songs from the Wu-Tang Clan discography. The purpose of this project is to offer a comprehensive and interactive resource for fans to explore and manage the Wu-Tang Clan song collection.

Project Name and Description
Project Name: Wu-Tang Discography API

Description: The Wu-Tang Discography API is a RESTful API that provides a comprehensive catalog of songs by the Wu-Tang Clan. It offers endpoints to retrieve song information, search for specific songs, access lyrics, create new songs, update existing songs, and delete songs.

Routes and Models
Routes:

GET /api/songs: Retrieves a list of all Wu-Tang Clan songs.
GET /api/songs/:id: Retrieves detailed information about a specific Wu-Tang Clan song.
GET /api/songs/:id/lyrics: Retrieves the lyrics for a specific Wu-Tang Clan song.
POST /api/songs: Creates a new Wu-Tang Clan song.
PUT /api/songs/:id: Updates the information of a specific Wu-Tang Clan song.
DELETE /api/songs/:id: Deletes a specific Wu-Tang Clan song.
Models:

Song: Represents a Wu-Tang Clan song and includes attributes such as song name, release date, and associated album information.
User Stories
As a user, I should be able to retrieve a list of all Wu-Tang Clan songs by accessing the /api/songs route.
As a user, I should be able to search for a specific Wu-Tang Clan song by its ID using the /api/songs/:id route.
As a user, I should be able to view detailed information about a specific Wu-Tang Clan song, including its release date and album information, by accessing the /api/songs/:id route.
As a user, I should be able to retrieve the lyrics for a specific Wu-Tang Clan song by accessing the /api/songs/:id/lyrics route.
As a user, I should be able to create a new Wu-Tang Clan song by sending a POST request to the /api/songs route with the necessary song details.
As a user, I should be able to update the information of a specific Wu-Tang Clan song by sending a PUT request to the /api/songs/:id route with the updated song details.
As a user, I should be able to delete a specific Wu-Tang Clan song by sending a DELETE request to the /api/songs/:id route.

MVP Goals
Implement the /api/songs route to retrieve a list of all Wu-Tang Clan songs.
Implement the /api/songs/:id route to retrieve detailed information about a specific Wu-Tang Clan song.
Implement the /api/songs/:id/lyrics route to retrieve the lyrics for a specific Wu-Tang Clan song.
Implement the /api/songs route to create a new Wu-Tang Clan song.
Implement the /api/songs/:id route to update the information of a specific Wu-Tang Clan song.
Implement the /api/songs/:id route to delete a specific Wu-Tang Clan song.
Stretch Goals
Enable search functionality to allow users to search for Wu-Tang Clan songs by name, album, or other criteria.
Implement pagination for the /api/songs route to handle large datasets efficiently.
Add additional attributes to the Song model, such as song duration or featured artists, to provide more comprehensive information.
Implement a feature to allow users to contribute and submit corrections or additional lyrics for songs.
Repository Structure
Create two GitHub repositories for your project:

Front-end repository: This repository will contain the front-end code for your application.
API repository: This repository will contain the code for your Wu-Tang Discography API. Create a proposal.md file in the API repository and include your project proposal in there using the provided rubric as a template.
