const pool = require('../config/db');

const UserModel = {
    async createUser({ login_id, name, password }) {
        const query = `
            INSERT INTO "user"
                (login_id, name, password)
            VALUES ($1, $2, $3)
                RETURNING user_id, login_id, name, created_at;
        `;

        const values = [login_id, name, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async findByLoginId(login_id) {
        const result = await pool.query(
            `SELECT * FROM "user" WHERE login_id = $1`,
            [login_id]
        );
        return result.rows[0];
    },
};

module.exports = UserModel;
