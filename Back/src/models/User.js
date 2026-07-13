const db = require('../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError'); 

class User {

    static async register(name, email, password, avatar_url) {
        try {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            
            const urlPadrao = "https://link-do-avatar-padrao.com/avatar.png";
            const avatarFinal = avatar_url || urlPadrao;

            const sql = `INSERT INTO users (name, email, password_hash, avatar_url) VALUES (?, ?, ?, ?)`
            const [result] = await db.execute(sql, [name, email, passwordHash, avatarFinal]);

            return {
                id: result.insertId,
                name,
                email,
                avatar_url: avatarFinal
            };
        } catch (error) {
            throw error;
        }
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
    
    static async findByName(name){
        try {
            
            const sql = `SELECT id, name, avatar_url, created_at FROM users WHERE name LIKE ?`;
            const searchName = `%${name}%`;
            const [rows] = await db.execute(sql, [searchName]);

            if(rows.length === 0){
                throw new AppError("Nenhum usuário encontrado com esse nome", 404);
            }
            
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async update(id,new_name,new_avatar_url){
        try {
            const sql = `UPDATE users SET name = ?, avatar_url = ? WHERE id=?`;

            const [result] = await db.execute(sql,[new_name,new_avatar_url,id]);

            if(result.affectedRows === 0){
                throw new AppError("Erro ao atualizar usuario", 404);
            }

            return {
            id,
            name: new_name,
            avatar_url: new_avatar_url
        };

        } catch (error) {
            throw error;
        }
    }

    static async delete(id){
        try {
        const sql = `DELETE FROM users WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);

        
        if (result.affectedRows === 0) {
            throw new AppError("Usuário não encontrado", 404);
        }

        return true;
        } catch (error) {
            throw error;
        }

    }


}

module.exports = User;