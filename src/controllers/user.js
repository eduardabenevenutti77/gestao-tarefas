/*
    * O sistema deve permitir a criação de novos usuários com nome, email e senha.
    * O email deve ser único para cada usuário.
    * A senha deve ser armazenada de forma segura (hash).
*/

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'mikey';
const cripto = 7;

class UserController {
    async new_user(name, email, password ) {
        if (name === undefined || email === undefined || password === undefined) {
            throw new Error('Name, e-mail e password são obrigatórios!');
        } else if (/\d/.test(name)) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error('O name deve conter apenas letras!')
        } 
        try {
            const password_hash = await bcrypt.hash(password, cripto);
            const user = await User.create({ name, email, password: password_hash });
            return user;
        } catch (error) {
            return error;
        }
    }
    async update_user(id, name, email) {
        if (!id || !name || !email ) {
            throw new Error('ID, name e e-mail  são obrigatórios!');
        } else if (/\d/.test(name)) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error('O name deve conter apenas letras!')
        } 
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuário não foi encontrado! ');
            }
            user.name = name;
            user.email = email;
            await user.save();
            return user;
        } catch (error) {
            return error;
        }
    }
    async delete_user(id) {
        if (!id) {
            throw new Error('O id é obrigatório! ');
        }
        try {
            const user = await User.findByPk(id);
            if(!user) {
                throw new Error('Usuário não encontrado! ');
            }
            await user.destroy();
        } catch (error) {
           return error; 
        }
    }
    async show_user() {
        try {
            const user = await User.findAll();
            return user;
        } catch (error) {
            return error;
        }
    }
    async login(email, password) {
        if (!email || !password) {
            throw new Error('E-mail e password são obrigatórios! ');
        }
        try {
            const user = await User.findOne({ where: {email} });
            if (!user) {
                throw new Error('Usuário não foi encontrado!');
            }
            const correct_password = await bcrypt.compare(password, user.password);
            if(!correct_password) {
                throw new Error('Passoword inválido! ');
            }
            const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY );
            return token;
        } catch (error) {
            return error;
        }
    }
    async validate_token(token) {
        try {
            const validate = jwt.verify(token, JWT_SECRET_KEY);
            return validate;
        } catch (error) {
            throw new error;
        }
    }
}

module.exports = new UserController();