const db = require("../config/database");
const AppError = require("../utils/AppError");

class Annotations{

    static async create(excerpt_id,author_id,content){
        try {
            const sql = `INSERT INTO annotations (excerpt_id, author_id, content) VALUES (?, ?, ?)`;

            const [result] = await db.execute(sql,[excerpt_id,author_id,content]);

            return {
                id: result.insertId,
                excerpt_id: excerptId,
                author_id: authorId,
                content,
                is_ai_generated: false, 
                ai_asked_count: 0       
            };
        } catch (error) {
            throw error;
        }


    }
}