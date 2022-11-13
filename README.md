A digital streaming platform that allows users view actors, movies, and review them with up to 5 star rating. It is also a software solution for Digital Streaming System that allows admistrators to manage movies, actors, users, and user movie reviews. It is also a place for many handpicked movies around the world.


Built with the following technologies:

React - Typescript
HTML - 
SCSS
Redux Toolkit
Loopback 4 + Authentication and Authorization
MongoDB
Sonarqube
React Testing Library + Jest + Mock Service Worker


Features

View Movies (Users)
View movie details such as rating, description and more.
Search for movies.
View actors that are part of the movie.
View admin approved user reviews.
Give Movie Reviews (Users)
Submit a review of a movie.
Requires account login and activation from the admin.
Created review will be subjected for admin approval.
View Actors (Users)
With actor details such as name, link, etc.
Search for actors.
View the movies that the actor is part of.
A Dashboard for managing movies, actors, reviews, and users. (Admin)
Perform CRUD operations on all table management.
Activate/ Deactivate user.
Approve/ Disapprove movie reviews done by users.


Requirements

A running instance of a MongoDB server is required for the app to start. The MongoDB is used for storing all data.

Installation and Set Up

Do the following to clone and start the project. Install all dependencies, both frontend and backend.
This project was bootstrapped with Create React App, using the Redux and Redux Toolkit TS template.


$ git clone https://github.com/miggyAoanan/movie-review-app2.git
$ cd digital-streaming-app2
$ cd frontend
$ npm install
$ npm i
$ cd ../backend
$ npm i


Open two terminals and cd to frontend and backend folders respectively and start them

$ cd frontend
$ npm start

$ cd backend
$ npm start



Models

This app has the following models:

User - a model representing the users of the app.
UserCredentials - a model representing sensitive credentials like a password of the users.
Movies - a model representing the movies of the app.
Actors - a model representing the actors of the app.
Reviews - a model representing the reviews of a user to a movie.


User is marked as having one UserCredentials model using the @hasOne decorator. The belongsTo relation for UserCredentials to User has not been created to keep the scope smaller.


