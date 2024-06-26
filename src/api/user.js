/*
    * O sistema deve permitir a criação de novos usuários com nome, email e senha.
    * O email deve ser único para cada usuário.
    * A senha deve ser armazenada de forma segura (hash).
*/
const UserController = require('../controllers/user');

class User {
    async newUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await UserController.newUser(name, email, password);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async updateUser(req, res) {
        const {id, name, email, password} = req.body;
        try {
            const user = await UserController.updateUser(Number(id), name, email, password);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async deleteUser(req, res) {
        const {id} = req.body;
        try {
            await UserController.deleteUser(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showUser(req, res) {
        try {
            const user = await UserController.showUser();
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const token = await UserController.login(email, password);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async validateToken(req, res, next) {
        const token = req.headers.authorization;
        try {
            await UserController.validateToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new User();