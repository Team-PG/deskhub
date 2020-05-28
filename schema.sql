-- DROP TABLE needs cascade to make sure all of the info is dropped.
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS weather CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  location VARCHAR(255),
  userid INT NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  forecast VARCHAR(255),
  timestamp INT,
  locid INT NOT NULL,
  FOREIGN KEY (locid) REFERENCES locations(id)
);


SELECT * FROM locations JOIN users ON locations.userid = users.id;
SELECT * FROM weather JOIN locations ON weather.locid = locations.id;
