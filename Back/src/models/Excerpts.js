const db = require("../config/database");
const AppError = require('../utils/AppError'); 

class Excerpts {

    static async create(bookId, submittedBy, content) {
        try {
            const sql = `INSERT INTO excerpts (book_id, submitted_by, content) VALUES (?, ?, ?)`;
            const [result] = await db.execute(sql, [bookId, submittedBy, content]);

            return {
                id: result.insertId,
                book_id: bookId,
                submitted_by: submittedBy,
                content
            };      
        } catch (error) {
            throw error;
        }
    }

    static async getByBook(bookId) {
        try {
            const sql = `SELECT * FROM excerpts WHERE book_id = ?`;
            const [rows] = await db.execute(sql, [bookId]);

            if (rows.length === 0) {
            throw new AppError("Trecho não encontrado", 404);
        }
            return rows;
        } catch (error) {
            throw error;  
        }
    }

    static async getByExcerpts(excerptId){
        try {
            const sql = `SELECT * FROM excerpts WHERE id=?`;
            const [rows] = await db.execute(sql,[excerptId]);

            if (rows.length === 0) {
            throw new AppError("Trecho não encontrado", 404);
        }
            return rows[0];
            
        } catch (error) {
            throw error;
        }
    }

    static async delete(excerptId, userId) {
        try {
            const sql = `DELETE FROM excerpts WHERE id = ? AND submitted_by = ?`;
            const [result] = await db.execute(sql, [excerptId, userId]);

            if (result.affectedRows === 0) {
                throw new AppError("Trecho não encontrado ou você não tem permissão para deletá-lo", 404);
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Excerpts;