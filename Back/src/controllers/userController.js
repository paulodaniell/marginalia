require('dotenv').config();
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

class userController {

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const newUser = await userModel.register(name, email, password);

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
}

module.exports = new userController();