const db = require("../config/database");
const AppError = require('../utils/AppError'); 

class Excerpts {

    static async create(bookId,submittedBy,content){
        const sql = `INSERT INTO excerpts (book_id, submitted_by, content) VALUES (?, ?, ?)`;
        const [result] = await db.execute(sql,[bookId, submittedBy, content]);

    return {
      id: result.insertId,
      book_id: bookId,
      submitted_by: submittedBy,
      content
    };

    }

    static async getByBook(bookId) {
    const sql = `SELECT * FROM excerpts WHERE book_id = ?`;
    const [rows] = await db.execute(sql, [bookId]);
    return rows;
  }


}

module.exports = Excerpts;
