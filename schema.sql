
-- DROP TABLE needs cascade to make sure all of the info is dropped.
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS weather CASCADE;
DROP TABLE IF EXISTS stocksSaved;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  location VARCHAR(255),
  userid INT NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  forecast VARCHAR(255),
  weatherTime VARCHAR(255),
  high INT,
  low INT,
  avg INT,
  sunrise VARCHAR(255),
  sunset VARCHAR(255),
  timestamp INT,
  locid INT NOT NULL,
  FOREIGN KEY (locid) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS
stocksSaved(
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(255)
)

SELECT * FROM locations JOIN users ON locations.userid = users.id;
SELECT * FROM weather JOIN locations on weather.locid = locations.id;

