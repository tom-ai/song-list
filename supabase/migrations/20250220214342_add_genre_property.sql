-- -- Create Genre table
-- CREATE TABLE Genre (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create junction table for Song and Genre
-- CREATE TABLE Song_Genre (
--     song_id INTEGER REFERENCES Song(id) ON DELETE CASCADE,
--     genre_id INTEGER REFERENCES Genre(id) ON DELETE CASCADE,
--     PRIMARY KEY (song_id, genre_id)
-- );

-- -- Add some initial genres (optional)
-- INSERT INTO Genre (name) VALUES 
--     ('Pop'), ('Classical');