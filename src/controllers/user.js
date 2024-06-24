/*
    * O sistema deve permitir a criação de novos usuários com nome, email e senha.
    * O email deve ser único para cada usuário.
    * A senha deve ser armazenada de forma segura (hash).
*/

const user = require('../models/user');

class UserController {
    async newUser(name, password, email) {
        if (name === undefined || email === undefined || password === undefined) {
            throw new Error('Name, e-mail e senha são obrigatórios!');
        }
        const new_user = await user.cre
    }
}