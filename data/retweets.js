const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

const createRetweet = async (data)=>{
    const createRetweetQuery = db.prepare(`
        INSERT INTO retweets (post_id, user_id)
        VALUES(
            @post_id,
            @user_id
        )
    `)

    createRetweetQuery.run(data);

}

const getRetweets = async()=>{
    const retweetQuery = `select * from retweets`

    const output = db.prepare(retweetQuery).all()

    return output;
}

// const fun = async()=>{
//     const output = await getRetweets();
//     console.log(output)
//     return output
// }

// console.log(fun());

module.exports = {
    createRetweet,
    getRetweets
}