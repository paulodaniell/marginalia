require('dotenv').config();
const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        
        if (!authHeader) {
            return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });
           
        }

        const [, token] = authHeader.split(" ");

        
        const { perfil, sub: id } = jwt.verify(token, process.env.JWT_SECRET);

       
        req.usuario = {
            id
        };

        return next();

    } catch (error) {
        
        return res.status(403).json({ erro: "Token inválido ou expirado." });
       
    }
}


module.exports = authToken;