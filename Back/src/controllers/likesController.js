const likesModel = require("../models/Likes");

class likesController {

    async create(req, res, next) {
        try {
            const { id: annotationId } = req.params;
            const userId = req.usuario.id;

            const newLike = await likesModel.create(annotationId, userId);

            return res.status(201).json(newLike);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id: annotationId } = req.params;
            const userId = req.usuario.id;

            await likesModel.delete(annotationId, userId);

            return res.status(200).json({ message: "Like removido com sucesso!" });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new likesController();