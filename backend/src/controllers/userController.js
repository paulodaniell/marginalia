require('dotenv').config();
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

class userController {

    async register(req, res, next) {
        try {
            const { name, email, password, avatar_url } = req.body;

            const newUser = await userModel.register(name, email, password,avatar_url);

            return res.status(201).json(newUser);
        } catch (error) {
            
            next(error);
        }
    }


    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await userModel.login(email, password);
            
            const token = jwt.sign(
                {}, 
                process.env.JWT_SECRET, 
                { 
                    subject: String(user.id), 
                    expiresIn: '1d' 
                }
            );
            
            return res.status(200).json({
                user,
                token
            });
        } catch (error) {
            next(error); 
        }
    }

    async findByName (req,res,next){
        try {
            
            const { name } = req.query;

            if(!name){
                throw new AppError("O parâmetro de busca 'nome' é obrigatório", 400);
            }

            const results = await userModel.findByName(name);
            return res.status(200).json(results);

        } catch (error) {
            next(error);
        }
    }

    async update(req,res,next){

        try {
            const idUser= req.usuario.id;
            const {new_name,new_avatar_url} = req.body;

            if(!new_name){
                throw new AppError("Digite um nome", 400);
            }
            const currentUser = await userModel.findById(idUser);
            const avatarFinal = new_avatar_url || currentUser.avatar_url;

            const results = await userModel.update(idUser, new_name, avatarFinal);

            
            return res.status(200).json(results);
            
        } catch (error) {
            next(error);
        }
    }

    async delete(req,res,next){
        try {
        const id = req.usuario.id;

        await userModel.delete(id);
        return res.status(200).json({ message: "Usuário deletado com sucesso!!" });
        } catch (error) {
            next(error);
        }
    }



}

module.exports = new userController();