const db = require("../config/database");
const AppError = require("../utils/AppError");

class Annotations {

    static async create(excerpt_id, author_id, content) {
        try {
            const sql = `INSERT INTO annotations (excerpt_id, author_id, content) VALUES (?, ?, ?)`;
            const [result] = await db.execute(sql, [excerpt_id, author_id, content]);

            return {
                id: result.insertId,
                excerpt_id, 
                author_id,  
                content,
                is_ai_generated: false,
                ai_asked_count: 0
            };
        } catch (error) {
            throw error;
        }
    }

    static async getByExcerptID(excerpt_id) {
        try {
            
            const sql = `SELECT * FROM annotations WHERE excerpt_id = ?`;
            const [rows] = await db.execute(sql, [excerpt_id]);

            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async reply(excerpt_id, author_id, content, parent_id) {
        try {
            
            const sql = `INSERT INTO annotations (excerpt_id, author_id, content, parent_id) VALUES (?, ?, ?, ?)`; 
            const [result] = await db.execute(sql, [excerpt_id, author_id, content, parent_id]);
            return {
                id: result.insertId,
                excerpt_id, 
                author_id,  
                content,
                parent_id,
                is_ai_generated: false,
                ai_asked_count: 0
            };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, author_id) {
        try {
            const sql = `DELETE FROM annotations WHERE id = ? AND author_id = ?`;
            const [result] = await db.execute(sql, [id, author_id]);

            if (result.affectedRows === 0) {
                throw new AppError("Anotação não encontrada ou você não tem permissão para deletá-la", 404);
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Annotations;