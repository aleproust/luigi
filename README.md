# luigi

- This project fetches movie data from TMDB  [api](https://developer.themoviedb.org) and allows you to play with the data in your own postgresSQL Database
- Notes: The functions requested can be idenfied by comments in the code
  - Ex: // 1. Back end task, 1


## Architecture:
There is 3 projects in this repository:
- grabber/
  - fetches and push data into local postgres
- api/
  - Queries the data from postgres database
- ui/
  - Render the data

## Pre-requisit:
- docker-compose
- node LTS version


## Run the project:
1. docker-compose up -d
2. cd api/ && npm install && npm start
3. cd grabber/ && npm install && npm start
4. At this step you should have data into you database. There is a ui to access it at http://localhost:8080
5. A swagger is also available at http://localhost:3000/api


## Current API Requests
- 1. Back end task 3, GET http://localhost:3000/movies?genreId=
- 1. Back end task 4, GET http://localhost:3000/movies?sortBy=&orderBy=
- 1. Back end task 5, POST http://localhost:3000/users
- 
- 