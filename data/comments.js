const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

const createComment= async(data)=>{
    const createCommentQuery = db.prepare(`
            INSERT INTO comments (post_id, user_id, content)
            VALUES(
                @post_id,
                @user_id,
                @content
            )
    `)

    createCommentQuery.run(data)
}

const getPostComments = async(post_id)=>{
    const getPostCommentsQuery = `
        SELECT * FROM comments
        WHERE post_id = ?
            
    `

    const rows = db.prepare(getPostCommentsQuery).all(post_id);
    return rows;
}

const getUserComments = async(user_id)=>{
    const getUserCommentsQuery = `
        SELECT * FROM comments
        WHERE user_id = ?
    `

    const getUserCommentsStmt = db.prepare(getUserCommentsQuery);
    getUserCommentsStmt.run(user_id);
}

// const data = async()=>{
//     const output = await getPostComments(1);
//     console.log(output);
//     return output;
// }

// data();

module.exports = {
    createComment,
    getPostComments,
    getUserComments
}