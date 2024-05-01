const Database = require('better-sqlite3');

// Open a connection to the SQLite database
const db = new Database('twitterClone.db');

// Define the SQL statement to create a table
const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        password TEXT
    )
`;

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        post_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        likes INTEGER,
        retweets INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`;

// Execute the SQL statement to create the table
db.exec(createUserTable);
db.exec(createPostsTable);

// Close the database connection
db.close();