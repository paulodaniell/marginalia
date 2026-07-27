const bookModel = require("../models/Book");


class bookController{

    async registerBook(req,res,next){
        try {
            const {title,author,cover_url} = req.body;

            const newBook = await bookModel.registerBook(title,author,cover_url);

            res.status(201).json(newBook);
        } catch (error) {
            next(error);
        }
    }


    async list(req,res,next){

        try {
            const books = await bookModel.list();
            
            res.status(200).json(books);

        } catch (error) {
            next(error);
        }
    }

    async findById(req,res,next){
        try {
            const {id} = req.params;

            const book = await bookModel.findById(id);

            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    async delete(req,res,next){
        try {
            const {id} = req.params;

            await bookModel.delete(id);
            return res.status(200).json({ message: "Livro deletado com sucesso!!" });
        } catch (error) {
            next(error);
        }
    }



}


module.exports = new  bookController();