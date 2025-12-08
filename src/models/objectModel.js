const pool = require('../config/db');

const ObjectModel = {
    async createObject({ name, user_id, position_x, position_y }) {
        const query = `
            INSERT INTO object (name, user_id, position_x, position_y)
            VALUES ($1, $2, $3, $4)
                RETURNING object_id, name, user_id, position_x, position_y;
        `;
        const values = [name, user_id, position_x, position_y];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async findObjectsByUserId(user_id) {
        const query = `
            SELECT object_id, name, user_id, position_x, position_y
            FROM object
            WHERE user_id = $1
            ORDER BY object_id ASC;
        `;
        const result = await pool.query(query, [user_id]);
        return result.rows;
    }
};

module.exports = ObjectModel;
