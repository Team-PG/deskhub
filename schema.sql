DROP TABLE stocksSaved;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(255),
--   password VARCHAR(255)
-- )

-- CREATE TABLE locations (
--   id SERIAL PRIMARY KEY,
--   location VARCHAR(255),
--   FOREIGN KEY (userNames)
-- )

CREATE TABLE IF NOT EXISTS
stocksSaved(
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(255)
)