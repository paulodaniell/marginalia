const db = require('../config/database');
const AppError = require('../utils/AppError');


class Book {

    static async registerBook(title,author,cover_url){
        try {
            const urlPadrao = "https:exemplo";
            const capaFinal = cover_url || urlPadrao;
            const sql = `INSERT INTO books (title,author,cover_url) VALUES (?,?,?)`

            const [result] = await db.execute(sql,[title,author,capaFinal]);

            return{
                id: result.insertId,
                title,
                author,
                cover_url: capaFinal
            }
        } catch (error) {
            throw error;
        }
    }

    static async list(){ 
        try {
            
            const [result] = await db.execute(`SELECT * FROM books`);

           
            if (result.length === 0) {
                throw new AppError("Nenhum livro encontrado", 404);
            }

           
            return result;

        } catch (error) {
           
            throw error;
        }
    }
    static async findById(id){
        try {
            const sql = `SELECT * FROM books WHERE id = ?`

            const [result] = await db.execute(sql,[id]);

            if(result.length === 0){
                throw new AppError("Nenhum livro encontrado", 404);
            }

            return result[0];
        } catch (error) {
            throw error;
        }
    }

    // FAZER PUT 

    static async delete(id){
        try {
            const sql = `DELETE FROM books WHERE id = ?`;
            const [result] = await db.execute(sql, [id]);

        
            if (result.affectedRows === 0) {
                    throw new AppError("Livro não encontrado", 404);
            }

        return true;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = Book;