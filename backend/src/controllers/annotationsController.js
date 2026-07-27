const annotationsModel = require("../models/Annotations");

class annotationController {

    async create(req, res, next) {
        try {
            const { excerptId } = req.params;
            const { content } = req.body;
            const authorId = req.usuario.id;

            const newAnnotation = await annotationsModel.create(excerptId, authorId, content);

            return res.status(201).json(newAnnotation);
        } catch (error) {
            next(error);
        }
    }

    async getByExcerptID(req, res, next) {
        try {
            const { excerptId } = req.params; 

            const annotations = await annotationsModel.getByExcerptID(excerptId);

            return res.status(200).json(annotations);
        } catch (error) {
            next(error);
        }
    }

    
    async reply(req, res, next) {
        try {
            const { excerptId, id: parent_id } = req.params; 
            const { content } = req.body;
            const authorId = req.usuario.id;
            
            const newReply = await annotationsModel.reply(excerptId, authorId, content, parent_id);

            return res.status(201).json(newReply);
        } catch (error) {
            next(error);
        }
    }

   
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const authorId = req.usuario.id;

            await annotationsModel.delete(id, authorId);

            return res.status(200).json({ message: "Anotação deletada com sucesso!!" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new annotationController();