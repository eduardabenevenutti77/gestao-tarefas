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
const Sequelize = require('sequelize');
const database = require('../database')

class User {
    constructor() {
        this.model = database.db.define('users', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            email: {
                type: database.db.Sequelize.STRING
            },
            password: {
                type: database.db.Sequelize.STRING
            },
            data_criacao: {
                type: database.db.Sequelize.DATE
            }
        })
    }
}

module.exports = (new User).model;