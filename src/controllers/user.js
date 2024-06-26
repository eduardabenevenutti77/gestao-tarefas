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
    async new_user(req, res) {
        const {name, email, password} = req.body;
        if (name === undefined || email === undefined || password === undefined) {
            throw new Error('Name, e-mail e password são obrigatórios!');
        }
        try {
            const password_hash = await bcrypt.hash(password, cripto);
            const user = await User.create({ name, email, password: password_hash });
            return res.status(201)(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async update_user(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!id || !name || !email || !password) {
            return res.status(400).json({ error: 'ID, name, e-mail e password são obrigatórios!' });
        }
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return  res.status(404).json({ error: 'Usuário não foi encontrado! '});
            }
            user.name = name;
            user.email = email;
            const password_hash = await bcrypt.hash(password, cripto);
            user.password = password_hash;
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete_user(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'O id é obrigatório! '});
        }
        try {
            const user = await User.findByPk(id);
            if(!user) {
                return res.status(404).json({ error: 'Usuário não encontrado! '});
            }
            await user.destroy();
            return res.status(204).send();
        } catch (error) {
           return res.status(500).json({ error: error.message }); 
        }
    }
    async show_user(req, res) {
        try {
            const user = await User.findAll();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async login(req, res) {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e password são obrigatórios! '});
        }
        try {
            const user = await User.findOne({ where: {email} });
            if (!user) {
                return res.status(404).json({error: 'Usuário não foi encontrado!'});
            }
            const correct_password = await bcrypt.compare(password, user.password);
            if(!correct_password) {
                return res.status(401).json({ error: 'Passoword inválido! '});
            }
            const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY );
            return res.status(200).json({ token: token});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async validate_token(req, res) {
        const { token } = req.body;
        try {
            const validate = jwt.verify(token, JWT_SECRET_KEY);
            return res.status(200).json(validate);
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido! '});
        }
    }
}

module.exports = new UserController();