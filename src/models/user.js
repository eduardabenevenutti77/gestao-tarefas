/*
    * O sistema deve permitir a criação de novos usuários com nome, email e senha.
    * O email deve ser único para cada usuário.
    * A senha deve ser armazenada de forma segura (hash).
    
    * ID (único)
    * Nome
    * Email
    * Senha (hash)
    * Data de criação
*/
const { type } = require('os');
const database = require('../config/database');

class User {
    constructor() {
        this.model = database.define('users', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.Sequelize.STRING
            },
            email: {
                type: database.Sequelize.STRING
            },
            password: {
                type: database.Sequelize.STRING
            },
            data_criacao: {
                type: database.Sequelize.DATATIME
            }
        })
    }
}

module.exports = (new User).model;