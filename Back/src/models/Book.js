const db = require('../config/database');

class Book {

    static async list(){ 
        try {
            
            const [result] = await db.execute(`SELECT * FROM books`);

           
            if (result.length === 0) {
                throw { status: 404, message: "Nenhum livro encontrado" };
            }

           
            return result;

        } catch (error) {
           
            throw error;
        }
    }
}

module.exports = Book;