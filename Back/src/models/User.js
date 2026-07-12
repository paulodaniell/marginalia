const db = require('../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError'); 

class User {

    static async register(name, email, password) {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const sql = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`
            const [result] = await db.execute(sql, [name, email, passwordHash]);

            return {
                id: result.insertId,
                name,
                email
            };

        
    }

    static async login(email, userPassword) {
        try {
          const sql = `SELECT id, name, email, password_hash, avatar_url FROM users WHERE email = ?`;
            const [result] = await db.execute(sql, [email]);

            if (result.length === 0) {
                
                throw new AppError("Email ou Senha inválidos!", 401);
            }

            const user = result[0];
            const isPasswordValid = await bcrypt.compare(userPassword, user.password_hash);

            if (!isPasswordValid) {
                
                throw new AppError("Email ou Senha inválidos!", 401);
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url
            };

        } catch (error) {
             throw error; 
        }
    } 
}

module.exports = User;