const userModel = require("../models/User");

class userController{

    async register(req,res){
        try {

            const {name,email,password} = req.body;

            const newUser = await userModel.register(name,email,password);

            res.status(200).json(newUser);
        } catch (error) {
            console.error("Erro no userController:", error);
            const status = error.status || 500;
            return res.status(status).json({ erro: error.message || "Erro interno ao registrar usuário." });

        }
    }

    async login(req,res){

        try {
            const {email,password}= req.body;

            const user = await userModel.login(email,password);

            res.status(200).json(user);
        } catch (error) {
            console.error("Erro no userController:", error);
            const status = error.status || 500;
            return res.status(status).json({ erro: error.message || "Erro interno ao realizar login." });
        }
    }


}

module.exports = new userController();