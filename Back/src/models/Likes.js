const db = require("../config/database");
const AppError = require("../utils/AppError");

class Likes {

    static async create(annotation_id, user_id) {
        try {
            const sql = `INSERT INTO likes (annotation_id, user_id) VALUES (?, ?)`;
            const [result] = await db.execute(sql, [annotation_id, user_id]);

            return {
                id: result.insertId,
                annotation_id,
                user_id
            };
        } catch (error) {
           
            if (error.code === 'ER_DUP_ENTRY') {
                throw new AppError("Você já deu like nesta anotação", 400);
            }
            throw error;
        }
    }

    static async delete(annotation_id, user_id) {
        try {
            const sql = `DELETE FROM likes WHERE annotation_id = ? AND user_id = ?`;
            const [result] = await db.execute(sql, [annotation_id, user_id]);

            if (result.affectedRows === 0) {
                throw new AppError("Like não encontrado", 404);
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Likes;