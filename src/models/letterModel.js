const pool = require('../config/db');

const LetterModel = {

    async createLetter({ user_id, sender_name, content }) {
        const query = `
            INSERT INTO letter (user_id, sender_name, content)
            VALUES ($1, $2, $3)
                RETURNING letter_id, user_id, sender_name, content, created_at;
        `;
        const values = [user_id, sender_name, content];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    //  편지 목록 조회
    async findLettersByUserId(user_id) {
        const query = `
            SELECT letter_id, user_id, sender_name, content, created_at
            FROM letter
            WHERE user_id = $1
            ORDER BY created_at DESC;
        `;
        const result = await pool.query(query, [user_id]);
        return result.rows;
    },

    //  편지 단건 조회 (본인 트리 편지만)
    async findLetterById(letter_id, user_id) {
        const query = `
            SELECT letter_id, user_id, sender_name, content, created_at
            FROM letter
            WHERE letter_id = $1 AND user_id = $2;
        `;
        const result = await pool.query(query, [letter_id, user_id]);
        return result.rows[0];
    }
};

module.exports = LetterModel;
