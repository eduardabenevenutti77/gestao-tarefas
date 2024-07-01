/*
    * O sistema deve permitir a criação de novos usuários com nome, email e senha.
    * O email deve ser único para cada usuário.
    * A senha deve ser armazenada de forma segura (hash).
*/

const UserController = require('../controllers/user');

class User {
    async new_user(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await UserController.new_user(name, email, password);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async update_user(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const user = await UserController.update_user(Number(id), name, email);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async delete_user(req, res) {
        const { id } = req.params;
        try {
            await UserController.delete_user(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async show_user(req, res) {
        try {
            const user = await UserController.show_user();
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await UserController.login(email, password);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async validate_token(req, res, next) {
        const token = req.headers.authorization;
        try {
            await UserController.validate_token(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new User();