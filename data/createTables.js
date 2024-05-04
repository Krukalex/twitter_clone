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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`;

const createPostLikesTable = `
    CREATE TABLE IF NOT EXISTS postLikes (
        like_id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(post_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`;

const createRetweetTable = `
    CREATE TABLE IF NOT EXISTS retweets (
        retweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(post_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`;

const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS comments (
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        post_id INTEGER,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(post_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`

// Execute the SQL statement to create the table
db.exec(createUserTable);
db.exec(createPostsTable);
db.exec(createPostLikesTable);
db.exec(createRetweetTable);
db.exec(createCommentsTable);

//db.exec("Drop Table if exists postLikes")
// db.exec("DROP TABLE IF EXISTS posts")

// Close the database connection
db.close();