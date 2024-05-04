const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

// Prepare SQL statement to select data from the "users" table
const getPostsIds = async () => {
    const selectQuery = `
        SELECT post_id FROM posts
    `

    const rows = db.prepare(selectQuery).all();
    return rows;
};

const getPostsById = async (post_id) => {
    const selectQuery = `
        SELECT 
            p.post_id, 
            p.title, 
            p.content, 
            p.created_at, 
            p.user_id, 
            (select count(*) from postLikes pl where pl.post_id = p.post_id) as likes, 
            (select count(*) from retweets r where r.post_id= p.post_id) as retweets,
            (select count(*) from comments c where c.post_id= p.post_id) as comments
        FROM 
            posts p
        where p.post_id = ?
        group by
            p.post_id;
    `;

    const rows = db.prepare(selectQuery).get(post_id);

    return rows
}

const deletePost = async (post_id) => {
    //delete the likes associated with a tweet first, then delete the tweet itself
    
    const deleteLikesQuery = `
        DELETE FROM postLikes
        WHERE post_id = ?
    `;
    
    const deletePostQuery = `
        DELETE FROM posts
        WHERE post_id = ?
    `;

    const deleteLikeStmt = db.prepare(deleteLikesQuery);
    const deletePostStmt = db.prepare(deletePostQuery);

    //need to make sure to run delete like statement before delete post statement
    deleteLikeStmt.run(post_id);
    deletePostStmt.run(post_id);

}


const createPost = async (data)=>{

    const statement =db.prepare( `
        INSERT INTO posts (title, content, user_id)
        VALUES(      
            @title,
            @content,
            @user_id
        )
    `);

    statement.run(data)
    return statement;
}

module.exports = {
    getPostsIds,
    deletePost,
    createPost,
    getPostsById
};

// const data = async()=>{
//     const output = await getPostsById(1);
//     console.log(output);
//     return output;
// }

// data();


