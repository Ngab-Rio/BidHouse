\connect db_bid_house

-- =========================================================
-- Table users
-- =========================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================================
-- Table items
-- =========================================================
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title_item TEXT NOT NULL,
    description TEXT,
    start_price NUMERIC NOT NULL,
    min_increment NUMERIC DEFAULT 10000,
    start_at TIMESTAMP,
    end_at TIMESTAMP,
    status TEXT DEFAULT 'active',
    created_by INT REFERENCES users(id),
    winner_id INT,
    winner_name TEXT,
    final_price NUMERIC,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================================
-- Table bids
-- =========================================================
CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES items(id),
    user_id INT REFERENCES users(id),
    username TEXT REFERENCES users(username),
    amount NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

