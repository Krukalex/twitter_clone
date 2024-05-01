const sql = require('better-sqlite3');
const db = sql('twitterClone.db');

export const getUsers = async () => {
    const selectQuery = `
    SELECT * FROM users;
    `;

    const rows = db.prepare(selectQuery).all();

    return rows
};

export const deleteUser = async (user_id) => {
    const query = `
        DELETE FROM users
        WHERE user_id = ?
    `;
    const deleteStmt = db.prepare(query);
    deleteStmt.run(user_id);

}

export const createUser = async (data)=>{
    const statement =db.prepare( `
        INSERT INTO users VALUES(
            null,
            @username,
            @email,
            @created_at,
            @password
        )
    `);

    statement.run(data)
}

//createUser(data);

