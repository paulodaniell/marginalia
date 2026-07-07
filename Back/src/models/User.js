const db = require('../config/database');
const bcrypt = require('bcrypt');


class User{

    static async register(name,email,password){
        try {
            
            const saltRounds = 10;

            const passwordHash = await bcrypt.hash(password, saltRounds);

            const sql = `INSERT INTO users (name,email,password_hash) VALUES (?,?,?)`
            const [result] = await db.execute(sql,[name,email,passwordHash]);

            return {
                id: result.insertId,
                name,
                email
            };

        } catch (error) {
            throw {error}
        }

    }

    static async login(email,userPassword){
        try {
            
            const sql = `SELECT * FROM users WHERE email = ?`
            const [result] = await db.execute(sql,[email]);

            if(result.length === 0){
                throw { status: 401, message: "Email ou Senha invalido!" };
            }

            const user = result[0];

            const isPasswordValid = await bcrypt.compare(userPassword, user.password_hash);

            if (!isPasswordValid) {
                throw { status: 401, message: "Email ou Senha inválidos!" };
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url
            };

        } catch (error) {
             throw {error}
        }
    } 

}

module.exports = User;
