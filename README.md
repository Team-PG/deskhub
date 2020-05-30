# DeskHub
### Code Fellows 301d62 Final Project
### Authors:
  - Nicco Ryan
  - Ryan Creamer
  - Garhett Morgan
  - Melissa Galush
  
### **Version**: 1.0.4

## Overview
DeskHub is an application designed to ease the hassle of browsing the internet daily for all the various information they might want to start their day. All in one place a user can find weather information for their location, news, stocks they're interested in, and job openings. All this information and more is available within our application, and a user's information is saved over each session to create a personalized experience.

## Getting Started
- Run NPM install from the root of this directory
- Create a .env file for your local port number and Postgres database info.
- Acquire API keys from: New York Times API, WeatherBit API, Financial Modeling Prep API (Stocks)
- Example env file:
  - PORT=3000
  - DATABASE_URL=postgres://USER:PASSWORD@DOMAIN:PORT/DBNAME
  - NEWS_API_KEY=1u4598419jf13uh341ohf34
  - STOCKS_API_KEY=ui43hf413ifn1iu3nf4ir43
  - WEATHER_API_KEY=o42urn34nf32onf34fm3kmrc
- Run the Schema file via the follow from the root of the repo: 
  - psql -d DBNAME -f schema.sql

## Architecture
This app utilizes JavaScript as the programming language, with Node and Express for running the server, as well as packages such as EJS for templating and rendering HTML, cors (provides the Connect/Express middleware), dotenv (for reading the env file), Postgres (for SQL database), superagent (collects data from APIs), and Method Override (unpacking data from forms).

## Credits and Collaborations
Photos from UnSplash
Photo Credits: Paweł Czerwiński, Josiah Day, Jeremy Thomas, Kalen Emsley
Special Thanks to: Nicholas Carignan, Chance Harmon



## Domain Model
![Domain Model](/public/assets/images/Domain.png)

## Database ERD:
![Database ERD](/public/assets/images/DB-ERD.png)
