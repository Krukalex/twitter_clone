const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

const getUsers = async () => {
    const selectQuery = `
    SELECT * FROM users;
    `;

    const rows = db.prepare(selectQuery).all();

    return rows
};

const getUserById = async(user_id)=>{
    const selectQuery = `
        SELECT * FROM users
        WHERE user_id = ?
    `

    const rows = db.prepare(selectQuery).all(user_id)
    return rows
}

const getUserByEmail = async(email)=>{
    const selectQuery = `
        SELECT * FROM users
        WHERE email = ?
    `

    const rows = db.prepare(selectQuery).all(email)
    return rows
}

const deleteUser = async (user_id) => {
    const query = `
        DELETE FROM users
        WHERE user_id = ?
    `;
    const deleteStmt = db.prepare(query);
    deleteStmt.run(user_id);

}

const createUser = async (data)=>{
    const statement =db.prepare( `
        INSERT INTO users (username, email, password)
        VALUES(
            @username,
            @email,
            @password
        )
    `);

    statement.run(data)
}

// const ex = async(email)=>{
//     const output = await getUserByEmail(email)
//     console.log(output)
// }

// ex('user@example.com')

module.exports={
    getUsers,
    getUserById,
    getUserByEmail,
    deleteUser,
    createUser
}