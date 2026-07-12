const annotationsModel = require("../models/Annotations");

class annotationController{

    async create(req,res,next){
        try{
        const { excerptId } = req.params;
        const {content} = req.body;
        const authorId = req.usuario.id;

        const newAnnotation = await annotationsModel.create(excerptId, authorId, content);

        return res.status(201).json(newAnnotation);
    }catch(error){
        next(error);
    }
    }
}

module.exports = new annotationController();