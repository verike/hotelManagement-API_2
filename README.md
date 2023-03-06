# HOTEL MANAGEMENT API_V2

A simple API for managing hotel operations.

This Hotel Management API is designed to manage hotel operations like registering Users and Admins, allows the Admin to create rooms and section types, fetch all rooms, fetch particular rooms with id, update individual rooms and deletes rooms with an id.

### The API has three main components:

- Users: Allows for creating, updating, getting a user, getting all users, loging in a user, logging out a user and deleting users who can access the API.
- Rooms: Allows for creating, updating, getting a room, filtering all rooms and deleting rooms in the hotel.
- Room Types: Allows for creating, getting a room type, getting all room types, and deleting different types of rooms available in the hotel.


## How To Use
- Clone the repo 
- cd into the `HOTELMANAGEMENT_API_2` directory .
- Create a new MongoDB database and copy your DATABASE_URI
- Create a .env file at the root of the folder and include your DATABASE_URI and a secret_key to generate tokens in the file in the format below
```
MONGODB_URI = {The URI for the database created}
JWT_SECRET = {Your secret keyword}

```
- To run the solution, make sure you have [nodejs](https://nodejs.org/) installed.
- Run the following command on your terminal to initialize and to install the necessary node dependencies.
```
npm install
nodemon src/app
```
Run the command below in your terminal to :

`npm init -y`: * Initialize the application.

`npm install`: * Install the dependencies.

`npm start`: * Start the application


# Testing Endpoints
- Postman or any similar app or extension is required to test this API.
- Requests can be made from your local computer or through the live endpoint
- If you're using the live endpoint then your {base url} is
```
https://myhotels.onrender.com
```
- If you're using your cloned app then your {base url} is
```
https://localhost:3000
```

# API Documentation
## Create a User
- endpoint: {base url}/api/v1/users/register
- method: post

## Login a User
- endpoint: {base url}/api/v1/users/login
- method: post

## Fetch all Users
- endpoint: {base url}/api/v1/users
- method: get


## Fetch a User
- endpoint: {base url}/api/v1/users/:username
- method: get

## Edit a User's Details
- endpoint: {base url}/api/v1/users/:username
- method: patch

## Delete a User
- endpoint: {base url}/api/v1/users/:username
- method: delete

## Create Room
- endpoint: {base url}/api/v1/rooms
- method: post

## Get all Rooms
- endpoint: {base url}/api/v1/rooms
- method: get

## Get a Room
- endpoint: {base url}/api/v1/rooms/:name
- method: get

## Edit a Room Details with id
- endpoint: {base url}/api/v1/rooms/:name
- method: patch

## Delete a Room
- endpoint: {base url}/api/v1/rooms/:name
- method: delete

## Create Room Type
- endpoint: {base url}/api/v1/rooms-types
- method: post

## Get all Rooms Types
- endpoint: {base url}/api/v1/rooms-types
- method: get

## Get a Room Type
- endpoint: {base url}/api/v1/rooms-type/:name
- method: get

## Delete a Room Type
- endpoint: {base url}/api/v1/rooms-type/:name
- method: delete