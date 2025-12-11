const db = require("../utils/db")

class UsersModel {
    static async findAll() {
        const q = `SELECT * FROM users`
        const res = await db.query(q)
        return res.rows
    }

    static async findByID(userID) {
        const q = `SELECT * FROM users WHERE id = $1`
        const res = await db.query(q, [userID])
        return res.rows[0]
    }

    static async findByName(username){
        const q = `SELECT * FROM users WHERE username = $1`
        const res = await db.query(q, [username])
        return res.rows
    }

    static async createUser(username, passwordHash, role) {
        const q = `
            INSERT INTO users (username, password_hash, role)
            VALUES ($1, $2, $3)
            RETURNING *
        `
        const res = await db.query(q, [username, passwordHash, role])
        return res.rows
    }

    static async updateUser({ username, passwordHash, role, userID }) {
        const q = `
            UPDATE users SET
                username = $1,
                password_hash = $2,
                role = $3
            WHERE id = $4
            RETURNING id, username, role
        `
        const res = await db.query(q, [
            username,
            passwordHash,
            role,
            userID
        ])
        return res.rows[0]
    }

    static async deleteUser(userID) {
        const q = `DELETE FROM users WHERE id = $1`
        await db.query(q, [userID])
        return true
    }
}

module.exports = UsersModel
