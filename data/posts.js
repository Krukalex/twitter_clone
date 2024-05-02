const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

// Prepare SQL statement to select data from the "users" table
export const getPosts = async () => {
    const selectQuery = `
    SELECT * FROM posts;
    `;

    const rows = db.prepare(selectQuery).all();

    return rows
};

export const deletePost = async (post_id) => {
    const query = `
        DELETE FROM posts
        WHERE post_id = ?
    `;
    const deleteStmt = db.prepare(query);
    deleteStmt.run(post_id);

}


export const createPost = async (data)=>{
    console.log(data)

    const statement =db.prepare( `
        INSERT INTO posts (title, content, likes, retweets, user_id)
        VALUES(      
            @title,
            @content,
            @likes,
            @retweets,
            @user_id
        )
    `);

    statement.run(data)
    return statement;
}



