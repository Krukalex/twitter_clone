const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

const getPostLikes = async()=>{
    const postLikesQuery = `select * from postLikes`

    const output = db.prepare(postLikesQuery).all()

    return output;
}

const createPostLike = async(data)=>{
    const statement =db.prepare( `
        INSERT INTO postLikes (post_id, user_id)
        VALUES(      
            @post_id,
            @user_id
        )
    `);

    statement.run(data)
    return statement;
}

module.exports = {
    getPostLikes,
    createPostLike
};

// const fun = async()=>{
//     const output = await getPostLikes();
//     console.log(output)
//     return output
// }

// console.log(fun());
