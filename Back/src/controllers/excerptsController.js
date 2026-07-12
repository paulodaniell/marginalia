const excerptsModel = require("../models/Excerpts");

class excerptsController{


    async create(req,res,next){
        try {
            const { id: bookId } = req.params;
            const { content } = req.body;
            const submittedBy = req.usuario.id;

            const newExcerpts = await excerptsModel.create(bookId,submittedBy,content);

            res.status(201).json(newExcerpts);



        } catch (error) {
            next(error);
        }
    }

    async getBybook(req,res,next){
        try {
            const { id: bookId } = req.params;
            const excerpts = await excerptsModel.getByBook(bookId);

            res.status(200).json(excerpts);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new excerptsController();